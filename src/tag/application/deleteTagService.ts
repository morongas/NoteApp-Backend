import { IAppService } from "src/core/application/IAppService";
import { createTagDto } from "./dto/createTagDto";
import { Either } from "src/generics/Either";
import { IEtiqueta } from "../domain/repository/IEtiqueta";
import { Etiqueta } from "../domain/Etiqueta";
import { EtiquetaId } from "../domain/ValueObjects/EtiquetaId";

export class DeleteTagService{
    constructor(
        public EtiquetaRepository: IEtiqueta
    ){}
    
    async execute(id: string): Promise<Either<Error, string>> {
    
        let result = await this.EtiquetaRepository.eliminarEtiqueta(id)

        if(result.isLeft()){
            return result
        }
        return Either.makeRight<Error,string>("Resultado: "+  result.getRight());

        
    }
}