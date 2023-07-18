import { INotes } from "../domain/repository/INotes";
import { findNoteDto } from "./dto/findNoteDto";
import { Either } from "src/generics/Either";
import { NoteAggregate } from "../domain/noteAggregate";

export class findNoteService<T>{
    private readonly notaRepositorio: INotes<T>

    constructor(notaRepo: INotes<T>) {
        this.notaRepositorio = notaRepo;
    }

    async execute(dto: findNoteDto): Promise<Either<Error, NoteAggregate>> {

        return await this.notaRepositorio.buscarNota(dto.id);

    }
}