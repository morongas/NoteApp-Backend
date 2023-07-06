import { IAppService } from "src/core/application/IAppService";
import { deleteNoteDto } from "./dto/deleteNoteDto";
import { Either } from "src/generics/Either";
import { Inject } from "@nestjs/common";
import { INotes } from "../domain/repository/INotes";

export class deleteNoteService implements IAppService<deleteNoteDto, string>{
    private noteRepository: INotes;

    constructor(@Inject('INotes') repo: INotes) {
        this.noteRepository = repo;
    }
    
    
    async execute(dto: deleteNoteDto): Promise<Either<Error, string>> {
        let result = await this.noteRepository.deleteNota(dto.idnote);
        if((result).isLeft()){
            return result; 
        }
        return Either.makeRight<Error,string>("Resultado "+  result);
    }

}