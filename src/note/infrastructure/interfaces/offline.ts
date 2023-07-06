import { lateBody } from "./lateBody";
import { lateTask } from "./lateTask";
import { notas } from "./lateNotas";

export interface offline{
    action: string;
    nota?: notas
    bod?: lateBody;
    task?: lateTask;
}