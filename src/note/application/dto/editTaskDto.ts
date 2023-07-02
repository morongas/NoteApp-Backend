export class editTaskDto {
    text: string;
    status: string;
    idTask: string;

    constructor(text, status,  idTask) {
        this.text = text;
        this.status = status;
        this.idTask = idTask;
    }
}