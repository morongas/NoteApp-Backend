import { Either } from "src/generics/Either";
import { Etiqueta } from "../Etiqueta";
import { EtiquetaId } from "../ValueObjects/EtiquetaId";

export interface IEtiqueta{
    crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, string>>;
    editarEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, string>>;
    eliminarEtiqueta(id: string): Promise<Either<Error, string>>
}