import { IAppService } from "src/core/application/IAppService";
import { updateBodyDto } from "./dto/updateBodyDto";
import { Either } from "src/generics/Either";
import { Inject } from "@nestjs/common";
import { IBody } from "../domain/repository/IBody";
import { NoteAggregate } from "../domain/noteAggregate";

export class updateBodyFromNoteService<T> implements IAppService<updateBodyDto, string>{
    private NotesRepository: IBody<T>;

    constructor(repo: IBody<T>) {
        this.NotesRepository = repo;
    }
    
    async execute(dto: updateBodyDto): Promise<Either<Error, string>> {

        if((dto.imagen === undefined)||(dto.imagen === null)){
            dto.imagen = Buffer.from("");
        }
        const bo = NoteAggregate.editBody(dto.idBody,dto.fecha,dto.ocr,dto.text,dto.imagen);
        if (bo.isLeft()) {
            return Either.makeLeft<Error, string>(new Error('No se puede editar el body'));
        }else{
            let result = await this.NotesRepository.editBody(dto.idBody,bo.getRight());
            if(result.isLeft()){
                return result; 
            }
            return Either.makeRight<Error,string>(result.getRight());
        }
    }
}