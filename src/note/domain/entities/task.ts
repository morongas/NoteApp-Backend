import { Either } from "src/generics/Either";
import { IDNota } from "../valueObjects/IDNota";
import { IDTask } from "../valueObjects/IDTask";
import { StatuTask } from "../valueObjects/StatuTask";
import { TitleTask } from "../valueObjects/TitleTask";

export class task{
    private id: IDTask;
    private title: TitleTask;
    private date: Date;
    private status: StatuTask;
    private idNota: IDNota;

    constructor(id: IDTask, title: TitleTask, date: Date, status: StatuTask, idNota: IDNota){
        this.id = id;
        this.title = title;
        this.date = date;
        this.status = status;
        this.idNota = idNota;
    }

    static createTask(titulo: string, fecha: Date, status: string, nota: string): Either<Error, task>{
        const id = IDTask.createId();
        const title = TitleTask.createTitle(titulo);
        const idNota = IDNota.create(nota);
        let statu;
        switch(status.trim().toLowerCase()){
            case "listo":
                statu = StatuTask.Listo;
                break;
            case "por hacer":
                statu = StatuTask.PorHacer;
                break;
            default:
                return Either.makeLeft<Error, task>(new Error("El estado no es valido"));
                break;
        }

        if(title.isLeft()){
            return Either.makeLeft<Error, task>(title.getLeft());
        }else{
            return Either.makeRight<Error, task>(new task(id, title.getRight(), fecha, statu, idNota));
        }
    }

    static editTask(id: string, titulo: string, status: string): Either<Error, task>{
        if(id === undefined){
            return Either.makeLeft<Error, task>(new Error("No se ha enviado el id de la tarea a editar"));
        }
        if(titulo === undefined && status === undefined ){
            return Either.makeLeft<Error, task>(new Error("tiene que haber un campo a editar"));
        }
        let sta;
        switch(status.trim().toLowerCase()){
            case "listo":
                sta = StatuTask.Listo;
                break;
            case "por hacer":
                sta = StatuTask.PorHacer;
                break;
            default:
                return Either.makeLeft<Error, task>(new Error("El estado no es valido"));
        }
        if(titulo === undefined){
            return Either.makeRight<Error, task>(new task(IDTask.createId(id), TitleTask.createTitle("").getRight(), new Date(), sta, IDNota.create()));
        }
        return Either.makeRight<Error, task>(new task(IDTask.createId(id), TitleTask.createTitle(titulo).getRight(), new Date(), sta, IDNota.create()));
    
    }

    public getId(): IDTask{
        return this.id;
    }

    public getTitle(): TitleTask{
        return this.title;
    }

    public getDate(): Date{
        return this.date;
    }

    public getStatus(): StatuTask{
        return this.status;
    }

    public getIdNota(): IDNota{
        return this.idNota;
    }
}