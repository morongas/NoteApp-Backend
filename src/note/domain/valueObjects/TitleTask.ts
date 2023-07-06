import { Either } from "src/generics/Either";

export class TitleTask{
    private title: string;

    constructor(title: string){
        this.title = title;
    }

    public getTitle(): string{
        return this.title;
    }

    static createTitle(title: string): Either<Error, TitleTask>{
        if(title === undefined){
            return Either.makeLeft<Error, TitleTask>(new Error("NO se ha introducido un titulo"));
        }
        if(title.length > 30){
            return Either.makeLeft<Error, TitleTask>(new Error("El titulo no puede tener mas de 30 caracteres"));
        }
        return Either.makeRight<Error, TitleTask>(new TitleTask(title));
    }
}