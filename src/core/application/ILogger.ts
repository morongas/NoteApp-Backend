import { Either } from "src/generics/Either";

export interface ILogger {
    execute(action: string, result: string): Promise<Either<Error, string>>;
}