import { IAppService } from "src/core/application/IAppService";
import { createTagDto } from "./dto/createTagDto";
import { Either } from "src/generics/Either";
import { IEtiqueta } from "../domain/repository/IEtiqueta";
import { Etiqueta } from "../domain/Etiqueta";
import { EtiquetaId } from "../domain/ValueObjects/EtiquetaId";

export class CreateTagService implements IAppService<createTagDto,string>{
    constructor(
       public EtiquetaRepository: IEtiqueta
    ){}
    
    async execute(dto: createTagDto): Promise<Either<Error, string>> {

        //Se crea el tag
        const tag = Etiqueta.create(dto.idUsuario, dto.nombre)
        
        //Se valida que el tag se haya creado bien, es decir
        //se le hayan pasado todos los parametros obligatorios
        if(tag.isLeft()){
            return Either.makeLeft<Error, string>(new Error(tag.getLeft().message.toString())) 
        }
        else{
        let result = await this.EtiquetaRepository.crearEtiqueta(tag.getRight())
        //se valida que se haya guardado en la BD
        if(result.isLeft()){
            return result
        }
        return Either.makeRight<Error,string>("Resultado: "+  result.getRight());
        }
    }
}