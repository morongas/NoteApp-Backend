import { IAppService } from "src/core/application/IAppService";
import { deleteBodyDto } from "./dto/deleteBodyDto";
import { Either } from "src/generics/Either";
import { IBody } from "../domain/repository/IBody";

export class deleteBodyService<T> implements IAppService<deleteBodyDto, string>{
    private bodyRepository: IBody<T>;

    constructor(repo: IBody<T>) {
        this.bodyRepository = repo;
    }
    
    
    async execute(dto: deleteBodyDto): Promise<Either<Error, string>> {
        let result = await this.bodyRepository.deleteBody(dto.idbody);
        if((result).isLeft()){
            return result; 
        }
        return Either.makeRight<Error,string>("Resultado "+  result);
    }

}