import { lateBody } from "./lateBody";
import { lateTask } from "./lateTask";
import { notas } from "./lateNotas";
import { lateEtiqueta } from "./lateEtiqueta";

export interface offline{
    action: string;
    nota?: notas
    bod?: lateBody;
    task?: lateTask;
    etiqueta?: lateEtiqueta;
}