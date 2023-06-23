import { Either } from "src/generics/Either";
import { Optional } from "src/generics/Optional";
import { v4 as uuidv4 } from 'uuid';


export class body {

    private idNota: string;  //Nota al cual esa asociado el body 
    private text?: string;
    private imagen?: Buffer;
    private IDbody: string;

    constructor(idNota: string, text?: string, imagen?: Buffer, idbody?: string) {
        this.idNota = idNota;
        this.text = text;
        this.imagen = imagen;
        if(idbody==undefined){
            this.IDbody = uuidv4();
        } else {
            this.IDbody = idbody;
        }
    }

    static create(idNota: string, text?: string, imagen?: Buffer, idBody?: string): Either<Error, body> {
        if(text===undefined && imagen===undefined){
            console.log('entra');
            return Either.makeLeft(new Error("Debe haber al menos un campo con información"));
        }
        if(idNota===undefined){
            return Either.makeLeft(new Error("Debe haber una nota para ser asociada"));
        }
        return Either.makeRight(new body(idNota, text,imagen,idBody));
        
    }

    //GETTERS
    public getidNota(): string {
        return this.idNota;
    }

    public gettext(): Optional<string> {
        if(this.text===undefined){
            return new Optional<string>();
        }else{
            return new Optional<string>(this.text);
        }
    }

    public getimagen(): Optional<Buffer> {
        if(this.imagen===undefined){
            return new Optional<Buffer>();
        }else{
            return new Optional<Buffer>(this.imagen);
        }
    }

    public getIDbody(): string {
        return this.IDbody;
    }

    //SETTERS
    public settext(text: string): void {
        this.text = text;
    }

    public setimagen(imagen: Buffer): void {
        this.imagen = imagen;
    }


    

}