import { Repository } from "typeorm";
import { Either } from "../../generics/Either";
import { IDNota } from "../domain/valueObjects/IDNota";
import { INotes } from "../domain/repository/INotes";
import { NoteAggregate } from "../domain/noteAggregate";
import { NoteEntity } from "./entities/note_entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Optional } from "../../generics/Optional";
import { bodyEntity } from "./entities/body_entity";
import { body } from "../domain/entities/body";

@Injectable()
export class adapterNoteRepository  implements INotes{
    constructor(
        @InjectRepository(NoteEntity)
        private readonly repositorio: Repository<NoteEntity>,
        @InjectRepository(bodyEntity)
        private readonly repositoriobody: Repository<bodyEntity>,

    ) {}

    async buscarNota(id: string): Promise<Either<Error, NoteAggregate>> {
        const result = await this.repositorio.find({ 
            where: {
                idNota: id
            }, 
            relations: {
                body: true,
            }
        });
        if (result.length == 0) {
            return Either.makeLeft<Error, NoteAggregate>(new Error('No se encontro la nota'));  
        }
        let aux = NoteAggregate.create(result[0].fechaNota, result[0].etiquetaNota, result[0].tituloNota, result[0].estadoNota, result[0].idNota);
        if(result[0].body.length == 0){
            return Either.makeRight<Error, NoteAggregate>(aux.getRight());
        }
        for(let i=0;i<result[0].body.length;i++){
            const bo = body.create(result[0].idNota, result[0].body[i].text, result[0].body[i].imagen,result[0].body[i].IDbody);
            if(bo.isRight()){
                aux.getRight().setbodyNota(bo.getRight());
            }
        }
            return Either.makeRight<Error, NoteAggregate>(aux.getRight());
    }

    async saveNota(nota: NoteAggregate): Promise<Either<Error, string>> {

        const aux: NoteEntity = {
            idNota: nota.getid().getIDNota(),
            estadoNota: nota.getestadoNota().getEstado(),
            etiquetaNota: nota.getetiquetaNota().getEtiquetaNota().getValue(),
            fechaNota: nota.getfechaNota().getFecha(),
            tituloNota: nota.gettituloNota().getTituloNota(),
            user: "1",
            body: []
        };
        try{
            const resultado = await this.repositorio.save(aux);
            return Either.makeRight<Error,string>(resultado.tituloNota);
        }catch(error){
            return Either.makeLeft<Error,string>(error);
        }
    }

    
    async editNota(id:string, nota: NoteAggregate): Promise<Either<Error, string>> {
        let noteToUpdate : NoteEntity;
        noteToUpdate = await this.repositorio.findOneBy({
            idNota: id,
        })

        const note = new Optional<NoteEntity>(noteToUpdate);

        if(!note.hasvalue()){
            return Either.makeLeft<Error,string>((new Error('La nota no existe')));
        }

        noteToUpdate.estadoNota = nota.getestadoNota().getEstado();
        noteToUpdate.etiquetaNota = nota.getetiquetaNota().getEtiquetaNota().getValue();
        noteToUpdate.fechaNota = nota.getfechaNota().getFecha();
        noteToUpdate.tituloNota = nota.gettituloNota().getTituloNota();

        try{
            const resultado = await this.repositorio.save(noteToUpdate);
            return Either.makeRight<Error,string>(resultado.tituloNota);
        }catch(error){
            return Either.makeLeft<Error,string>(error);
        }
    }

  

}