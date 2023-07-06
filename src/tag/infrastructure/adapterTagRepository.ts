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
        private readonly repo: Repository<TagEntity>,
        @InjectRepository(NoteEntity)
        private readonly repoNote: Repository<NoteEntity>
    ){}
    async crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, string>> {

        const tagAux: TagEntity= {
            id: etiqueta.getId().getid(),
            idUsuario: String(etiqueta.getIdUsuario().getIDUser()),
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

    async editarEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, string>> {
        let notas_id: string[] = [];

        etiqueta.getNotas().forEach(function(ids){
            notas_id.push(ids.getIDNota())
        })    
        let notasData: NoteEntity[] = await this.repoNote.findByIds(notas_id)

        const tagAux: TagEntity= {
            id: etiqueta.getId().getid(),
            idUsuario: String(etiqueta.getIdUsuario().getIDUser()),
            nombre: etiqueta.getNombre().getNombreEtiqueta(),
            //notas: notas_id
            notas : notasData
        };
        try{
            const resultado = await this.repo.save(tagAux);
            return Either.makeRight<Error,string>('Se ha modificado');
        }catch(error){
            return Either.makeLeft<Error,string>(error);
        }
    }

    async eliminarEtiqueta(id: string): Promise<Either<Error, string>> {
        try {
            const resultado = await this.repo.delete(id)
            return Either.makeRight<Error,string>('Se ha eliminado el tag correctamente');
        } catch (error) {
            return Either.makeLeft<Error,string>(error);
        }
    }
}