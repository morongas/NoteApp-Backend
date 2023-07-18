import { IAppService } from "src/core/application/IAppService";
import { addBodyDto } from "./dto/addBodyDto";
import { Either } from "src/generics/Either";
import { IBody } from "../domain/repository/IBody";
import { NoteAggregate } from "../domain/noteAggregate";

export class addBodyToNoteService<T> implements IAppService<addBodyDto, T>{
    private NotesRepository: IBody<T>;

    constructor(repo: IBody<T>) {
        this.NotesRepository = repo;
    }
    
    async execute(dto: addBodyDto): Promise<Either<Error, T>> {
        if((dto.imagen === undefined)){
            dto.imagen = Buffer.from("");
        }
        const bo = NoteAggregate.createBody(dto.idNota,dto.fecha,dto.ocr,dto.text, dto.imagen);
        if (bo.isLeft()) {
            return Either.makeLeft<Error, T>(new Error('No se puede crear el body'));
        }else{
            let result = await this.NotesRepository.saveBody(bo.getRight());
            if(result.isLeft()){
                return result; 
            }
            return result;
        }
    }
}