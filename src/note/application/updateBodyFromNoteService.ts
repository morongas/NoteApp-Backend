import { IAppService } from "src/core/application/IAppService";
import { updateBodyDto } from "./dto/updateBodyDto";
import { Either } from "src/generics/Either";
import { Inject } from "@nestjs/common";
import { body } from "../domain/entities/body";
import { IBody } from "../domain/repository/IBody";

export class updateBodyFromNoteService implements IAppService<updateBodyDto, string>{
    private NotesRepository: IBody;

    constructor(@Inject('IBody') repo: IBody) {
        this.NotesRepository = repo;
    }
    
    async execute(dto: updateBodyDto): Promise<Either<Error, string>> {

        if(dto.imagen === undefined){
            dto.imagen = Buffer.from("");
        }
        const bo = body.edit(dto.text, dto.imagen,dto.idBody);
        if (bo.isLeft()) {
            return Either.makeLeft<Error, string>(new Error('No se puede editar el body'));
        }else{
            let result = await this.NotesRepository.editBody(dto.idBody,bo.getRight());
            if(result.isLeft()){
                return result; 
            }
            return Either.makeRight<Error,string>("Resultado "+  result);
        }
    }
}