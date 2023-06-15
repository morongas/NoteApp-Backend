import { Repository } from "typeorm";
import { Either } from "../../generics/Either";
import { IDNota } from "../domain/valueObjects/IDNota";
import { INotes } from "../domain/repository/INotes";
import { NoteAggregate } from "../domain/noteAggregate";
import { NoteEntity } from "./entities/note_entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Optional } from "../../generics/Optional";

@Injectable()
export class adapterNoteRepository  implements INotes{
    constructor(
        @InjectRepository(NoteEntity)
        private readonly repositorio: Repository<NoteEntity>,
    ) {}

    async saveNota(nota: NoteAggregate): Promise<Either<Error, string>> {

        const aux: NoteEntity = {
            idNota: nota.getid().getIDNota(),
            cuerpoNotaText: nota.getcuerpoNota().getcuerpoNotaText(),
            cuerpoNotaImg: nota.getcuerpoNota().getcuerpoNotaImg(),
            estadoNota: nota.getestadoNota().getEstado(),
            etiquetaNota: nota.getetiquetaNota().getEtiquetaNota().getValue(),
            fechaNota: nota.getfechaNota().getFecha(),
            tituloNota: nota.gettituloNota().getTituloNota(),
            user: "1"
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

        noteToUpdate.cuerpoNotaText = nota.getcuerpoNota().getcuerpoNotaText();
        noteToUpdate.cuerpoNotaImg = nota.getcuerpoNota().getcuerpoNotaImg();
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