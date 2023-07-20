import { Either } from "src/generics/Either";

export interface IValidar{
    validarSuscripcion(usuarioId: number): Promise<Either<Error,boolean>>
}