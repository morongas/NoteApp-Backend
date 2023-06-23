import { Either } from "src/generics/Either";
import { Etiqueta } from "../Etiqueta";

export interface IEtiqueta{
    crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, String>>;
}