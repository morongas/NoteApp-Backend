import { Either } from "src/generics/Either";
import { NoteAggregate } from "src/note/domain/noteAggregate";
import { INotes } from "src/note/domain/repository/INotes";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";

export class mocksNote implements INotes<NoteEntity>{
    saveNota(nota: NoteAggregate): Promise<Either<Error, NoteEntity>> {
        let aux = nota.gettituloNota().getTituloNota();
        if (aux === "Prueba valida") {
            return Promise.resolve(Either.makeRight<Error, NoteEntity>(new NoteEntity()));
        } else {
            return Promise.resolve(Either.makeLeft<Error, NoteEntity>(new Error("Error al guardar")));
        }
    }
    editNota(id: string, nota: NoteAggregate): Promise<Either<Error, string>> {
        throw new Error("Method not implemented.");
    }
    buscarNota(id: string): Promise<Either<Error, NoteAggregate>> {
        throw new Error("Method not implemented.");
    }
    deleteNota(id: string): Promise<Either<Error, string>> {
        throw new Error("Method not implemented.");
    }

}
