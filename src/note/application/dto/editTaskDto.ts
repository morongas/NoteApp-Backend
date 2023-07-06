import { ApiProperty } from "@nestjs/swagger";

export class editTaskDto {
    @ApiProperty()
    text: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    idTask: string;

    constructor(text, status,  idTask) {
        this.text = text;
        this.status = status;
        this.idTask = idTask;
    }
}