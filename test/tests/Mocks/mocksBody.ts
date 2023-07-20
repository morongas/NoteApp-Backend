import { Either } from "src/generics/Either";
import { body } from "src/note/domain/entities/body";
import { IBody } from "src/note/domain/repository/IBody";
import { bodyEntity } from "src/note/infrastructure/entities/body_entity";

export class mocksBody implements IBody<bodyEntity>{
    saveBody(body: body): Promise<Either<Error, bodyEntity>> {
        let aux = body.gettext().getValue();
        if (aux === "Prueba valida") {
            return Promise.resolve(Either.makeRight<Error, bodyEntity>(new bodyEntity()));
        } else {
            return Promise.resolve(Either.makeLeft<Error, bodyEntity>(new Error("Error al guardar")));
        }
    }
    editBody(id: string, body: body): Promise<Either<Error, string>> {
        throw new Error("Method not implemented.");
    }
    deleteBody(id: string): Promise<Either<Error, string>> {
        throw new Error("Method not implemented.");
    }

}