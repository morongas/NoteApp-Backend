import { INotes } from "../domain/repository/INotes";
import { findNoteDto } from "./dto/findNoteDto";
import { Either } from "src/generics/Either";
import { NoteAggregate } from "../domain/noteAggregate";

export class findNoteService{
    private readonly notaRepositorio: INotes

    constructor(notaRepo: INotes) {
        this.notaRepositorio = notaRepo;
    }

    async execute(dto: findNoteDto): Promise<Either<Error, NoteAggregate>> {

        return await this.notaRepositorio.buscarNota(dto.id);

    }
}