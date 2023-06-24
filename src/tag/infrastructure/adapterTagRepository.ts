import { Either } from "src/generics/Either";
import { Etiqueta } from "../domain/Etiqueta";
import { EtiquetaId } from "../domain/ValueObjects/EtiquetaId";
import { IEtiqueta } from "../domain/repository/IEtiqueta";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { Repository } from "typeorm";
import { TagEntity } from "./entities/tag_entity";
import { NoteAggregate } from "src/note/domain/noteAggregate";

export class adapterTagRepository implements IEtiqueta{

    constructor(
        @InjectRepository(TagEntity)
        private readonly repo: Repository<TagEntity>
    ){}
    async crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, string>> {
        // let notaAux;
        // let notaArrayAux: NoteEntity[]
        // for(let nota of etiqueta.notas){
        //     notaAux = NoteAggregate.create(nota.getfechaNota().getFecha(), 
        //     nota.getetiquetaNota().getEtiquetaNota().getValue(), 
        //     nota.gettituloNota().getTituloNota(), nota.getestadoNota().getEstado(), 
        //     nota.getid().getIDNota())

        //     if (notaAux.isRight()){
        //         const aux: NoteEntity = {
        //             idNota: nota.getid().getIDNota(),
        //             estadoNota: nota.getestadoNota().getEstado(),
        //             etiquetaNota: nota.getetiquetaNota().getEtiquetaNota().getValue(),
        //             fechaNota: nota.getfechaNota().getFecha(),
        //             tituloNota: nota.gettituloNota().getTituloNota(),
        //             user: "1",
        //             body: []
        //         }
        //         notaArrayAux.push(aux)
        //     }
        // }
        const tagAux: TagEntity= {
            id: etiqueta.getId().getid(),
            idUsuario: etiqueta.getIdUsuario().getIDUser(),
            nombre: etiqueta.getNombre().getNombreEtiqueta(),
            //notas: notaArrayAux
            
        };
        try{
            const resultado = await this.repo.save(tagAux);
            return Either.makeRight<Error,string>('Se ha creado el tag correctamente');
        }catch(error){
            return Either.makeLeft<Error,string>(error);
        }
    }
}