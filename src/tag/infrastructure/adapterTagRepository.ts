import { Either } from "src/generics/Either";
import { Etiqueta } from "../domain/Etiqueta";
import { EtiquetaId } from "../domain/ValueObjects/EtiquetaId";
import { IEtiqueta } from "../domain/repository/IEtiqueta";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { Repository } from "typeorm";
import { TagEntity } from "./entities/tag_entity";

export class adapterTagRepository implements IEtiqueta{

    constructor(
        @InjectRepository(NoteEntity)
        private readonly repo: Repository<TagEntity>
    ){}
    async crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, EtiquetaId>> {
        const tagAux: TagEntity= {
            id: etiqueta.getId().getid(),
            idUsuario: etiqueta.getIdUsuario().getIDUser(),
            nombre: etiqueta.getNombre().getNombreEtiqueta()
        }
        
        return 
    }
}