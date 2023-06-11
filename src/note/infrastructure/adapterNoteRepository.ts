import { Repository } from "typeorm";
import { Either } from "../../generics/Either";
import { IDNota } from "../domain/valueObjects/IDNota";
import { INotes } from "../domain/repository/INotes";
import { NoteAggregate } from "../domain/noteAggregate";
import { NoteEntity } from "./entities/note_entity";

export class adapterNoteRepository extends Repository<NoteEntity> implements INotes{
    saveNota(nota: NoteAggregate): Promise<Either<string, Error>> {
        throw new Error("Method not implemented.");
    }
    editNota(nota: IDNota): Promise<Either<NoteAggregate, Error>> {
        throw new Error("Method not implemented.");
    }
}