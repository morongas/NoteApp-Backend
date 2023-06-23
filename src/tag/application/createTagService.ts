import { IAppService } from "src/core/application/IAppService";
import { createTagDto } from "./dto/createTagDto";
import { Either } from "src/generics/Either";
import { IEtiqueta } from "../domain/repository/IEtiqueta";
import { Inject } from "@nestjs/common";
import { Etiqueta } from "../domain/Etiqueta";

export class CreateTagService implements IAppService<createTagDto, string>{
    constructor(
        @Inject('IEtiqueta') public EtiquetaRepository: IEtiqueta
    ){}
    
    async execute(dto: createTagDto): Promise<Either<Error, string>> {
        
        const etiqueta = Etiqueta.
        
        return
    }
}