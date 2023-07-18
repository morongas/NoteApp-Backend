import { Either } from "src/generics/Either";
import { task } from "../entities/task";

export interface ITask<T>{
    saveTask(task: task): Promise<Either<Error, T>>;
    editTask(id: string, task: task): Promise<Either<Error, string>>;
    deleteTask(id: string): Promise<Either<Error, string>>;
}