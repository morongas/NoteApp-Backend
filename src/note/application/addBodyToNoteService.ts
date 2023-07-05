import { IAppService } from "src/core/application/IAppService";
import { addBodyDto } from "./dto/addBodyDto";
import { Either } from "src/generics/Either";
import { Inject } from "@nestjs/common";
import { IBody } from "../domain/repository/IBody";
import { NoteAggregate } from "../domain/noteAggregate";

export class addBodyToNoteService implements IAppService<addBodyDto, string>{
    private NotesRepository: IBody;

    constructor(@Inject('IBody') repo: IBody) {
        this.NotesRepository = repo;
    }
    
    async execute(dto: addBodyDto): Promise<Either<Error, string>> {

        if((dto.imagen === undefined) || (dto.imagen === null)){
            dto.imagen = Buffer.from("");
        }
        const bo = NoteAggregate.createBody(dto.idNota, dto.text, dto.imagen);
        if (bo.isLeft()) {
            return Either.makeLeft<Error, string>(new Error('No se puede crear el body'));
        }else{
            let result = await this.NotesRepository.saveBody(bo.getRight());
            if(result.isLeft()){
                return result; 
            }
            return Either.makeRight<Error,string>("Resultado "+  result);
        }
    }
}