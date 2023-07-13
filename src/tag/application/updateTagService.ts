import { Either } from "src/generics/Either";
import { IEtiqueta } from "../domain/repository/IEtiqueta";
import { Etiqueta } from "../domain/Etiqueta";
import { editTagDto } from "./dto/editTagDto";
import { IAppService } from "src/core/application/IAppService";

export class UpdateTagService implements IAppService<editTagDto,string>{
    constructor(
       public EtiquetaRepository: IEtiqueta
    ){}
    
    async execute(dto: editTagDto): Promise<Either<Error, string>> {

        //Se crea el tag
        const tag = Etiqueta.edit(dto.idUsuario, dto.nombre, dto.id, dto.notas)
        //Se valida que el tag se haya creado bien, es decir
        //se le hayan pasado todos los parametros obligatorios
        if(tag.isLeft()){
            return Either.makeLeft<Error, string>(new Error(tag.getLeft().message.toString())) 
        }
        else{
        let result = await this.EtiquetaRepository.editarEtiqueta(tag.getRight())
        //se valida que se haya guardado en la BD
        if(result.isLeft()){
            return result
        }
        return Either.makeRight<Error,string>("Resultado: "+  result.getRight());
        }
    }
}