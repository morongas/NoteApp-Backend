import { Either } from "src/generics/Either";
import { createnoteService } from "./createNoteService";
import { CreateNoteDto } from "./dto/CreateNoteDto";
import { INotes } from "../domain/repository/INotes";
import { Inject } from "@nestjs/common";
import { addBodyDto } from "./dto/addBodyDto";
import { IBody } from "../domain/repository/IBody";
import { addBodyToNoteService } from "./addBodyToNoteService";
import { updateBodyDto } from "./dto/updateBodyDto";
import { updateBodyFromNoteService } from "./updateBodyFromNoteService";
import { addTaskDto } from "./dto/addTaskDto";
import { ITask } from "../domain/repository/ITask";
import { addTaskService } from "./addTaskService";
import { editTaskDto } from "./dto/editTaskDto";
import { updateTaskService } from "./updateTaskService";
import { deleteTaskService } from "./deleteTaskService";
import { deleteTaskDto } from "./dto/deleteTaskDto";
import { updatenoteService } from "./updateNoteService";
import { UpdateNoteDto } from "./dto/UpdateNoteDto";
import { deleteNoteDto } from "./dto/deleteNoteDto";
import { deleteNoteService } from "./deleteNoteService";
import { deleteBodyDto } from "./dto/deleteBodyDto";
import { deleteBodyService } from "./deleteBodyService";

export class lateService<T>{
    private notas: createnoteService<T>;
    private body: addBodyToNoteService<T>;
    private editBody: updateBodyFromNoteService<T>;
    private task: addTaskService<T>;
    private editTask: updateTaskService<T>;
    private deleteTask: deleteTaskService<T>;
    private updateNote: updatenoteService<T>;
    private deleteNote: deleteNoteService<T>;
    private deleteBody: deleteBodyService<T>;

    constructor(@Inject('lateNota') repo: createnoteService<T>, @Inject('lateUpdateNote') repoNoteUpdate: updatenoteService<T>, @Inject('deleteNote') repoDelteNote: deleteNoteService<T>,
                @Inject('lateCreateBody') lateBody: addBodyToNoteService<T>, @Inject('lateUpdateBody') repoUpdateBody: updateBodyFromNoteService<T>, @Inject('lateDeleteBody') repoDeleteBody: deleteBodyService<T>,
                @Inject('lateCreateTask') lateTask: addTaskService<T>, @Inject('lateUpdateTask') lateUpdateTask: updateTaskService<T>, @Inject('lateDeleteTask') repoDeleteTask: deleteTaskService<T>) { 
        this.notas = repo;
        this.body = lateBody;
        this.editBody = repoUpdateBody;
        this.task = lateTask;
        this.editTask = lateUpdateTask;
        this.deleteTask = repoDeleteTask;
        this.updateNote = repoNoteUpdate;
        this.deleteNote = repoDelteNote;
        this.deleteBody = repoDeleteBody;
    }

    async execute(body): Promise<Either<Error, string>> {
        let result;
        let idNotanueva;
        for(let x in body){
            switch(body[x].action){
                case "createNote":
                    let dto = new CreateNoteDto(body[x].nota.titulo, body[x].nota.fechaC, body[x].nota.latitud,body[x].nota.longitud,body[x].nota.descripcionGPS,body[x].nota.est, body[x].nota.desc, body[x].nota.idUsuario);
                    result = await this.notas.execute(dto);
                    idNotanueva = result.getRight();
                    break;
                case "updateNote": 
                    let dtoUpdate = new UpdateNoteDto(body[x].nota.titulo, body[x].nota.idNota,  body[x].nota.fechaC, body[x].nota.est, body[x].nota.desc);
                    result = await this.updateNote.execute(dtoUpdate);
                    break;
                case "deleteNote":
                    let dtoDelete = new deleteNoteDto(body[x].nota.idNota);
                    result = await this.deleteNote.execute(dtoDelete);
                    break;
                case "addBody":
                    let idNota;
                    if((body[x].bod.idNota === undefined)||(body[x].bod.idNota === null)){
                        idNota = idNotanueva;
                    }else{
                        idNota = body[x].bod.idNota;
                    }
                    let dtoBody = new addBodyDto(idNota, body[x].bod.fecha,body[x].bod.text, body[x].bod.img);
                    result = await this.body.execute(dtoBody);
                    break;
                case "updateBody":
                    let editBodyDto = new updateBodyDto(body[x].bod.idBody, body[x].bod.fecha, body[x].bod.text, body[x].bod.img);
                    result = await this.editBody.execute(editBodyDto);
                    break;
                case "deleteBody":
                    let deleteBody= new deleteBodyDto(body[x].bod.idBody);
                    result = await this.deleteBody.execute(deleteBody);
                    break
                case "createTask":
                    let idNotaTask;
                    if((body[x].task.idNota === null)||(body[x].task.idNota === undefined)){
                        console.log("ENTRO");
                        idNotaTask = idNotanueva;
                    }else{
                        idNotaTask = body[x].task.idNota;
                    }
                    let dtoTask = new addTaskDto(idNotaTask, body[x].task.text, body[x].task.status, body[x].task.fechaCreacion);
                    result = await this.task.execute(dtoTask);
                    break;
                case "updateTask":
                    let dtoEditTask = new editTaskDto(body[x].task.text, body[x].task.status, body[x].task.idTask);
                    result = await this.editTask.execute(dtoEditTask);
                    break;
                case "deleteTask":
                    let dtoDeleteTask = new deleteTaskDto(body[x].task.idTask);
                    result = await this.deleteTask.execute(dtoDeleteTask);
                    break;
                default:

                    break;
            }
        }
        return Either.makeRight<Error, string>("Lay creado");
    }
}