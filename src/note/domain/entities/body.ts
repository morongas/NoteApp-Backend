import { Either } from "src/generics/Either";
import { Optional } from "src/generics/Optional";
import { v4 as uuidv4 } from 'uuid';


export class body {

    private idNota: string;  //Nota al cual esa asociado el body 
    private fecha: Date;
    private text?: string;
    private imagen?: Buffer;
    private IDbody: string;
    private OCR?: boolean;

    constructor(idNota: string,fecha: Date, OCR?: boolean,text?: string, imagen?: Buffer, idbody?: string) {
        this.idNota = idNota;
        this.fecha= fecha;
        this.text = text;
        this.imagen = imagen;
        this.OCR = OCR;
        if(idbody==undefined){
            this.IDbody = uuidv4();
        } else {
            this.IDbody = idbody;
        }
        
    }

    static create(idNota: string,fecha:Date,ocr:boolean ,text?: string, imagen?: Buffer, idBody?: string): Either<Error, body> {
        if(text===undefined && imagen===undefined){
            return Either.makeLeft(new Error("Debe haber al menos un campo con información"));
        }
        if(idNota===undefined){
            return Either.makeLeft(new Error("Debe haber una nota para ser asociada"));
        }
        if(fecha===undefined){
            return Either.makeLeft(new Error("Debe haber una fecha para ser asociada"));
        }
        if(ocr === undefined){
            return Either.makeLeft(new Error("Se tiene que decir el tipo de nota"));
        }
        return Either.makeRight(new body(idNota,fecha,ocr,text,imagen,idBody));
        
    }

    static edit(fecha:Date,ocr:boolean, text?: string, imagen?: Buffer, idBody?: string): Either<Error, body> {
        if(text===undefined && imagen===undefined){
            return Either.makeLeft(new Error("Debe haber al menos un campo con información"));
        }
        if(idBody===undefined){
            return Either.makeLeft(new Error("Debe haber un body para poder editar"));
        }
        if(fecha===undefined){
            return Either.makeLeft(new Error("Debe haber una fecha para ser asociada"));
        }
        return Either.makeRight(new body(idBody,fecha,ocr,text,imagen,idBody));
        
    }

    //GETTERS
    public getidNota(): string {
        return this.idNota;
    }

    public getfecha(): Optional<Date> {
        if(this.text===undefined){
            return new Optional<Date>();
        }else{
            return new Optional<Date>(this.fecha);
        }
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

    public getOCR(): boolean {
        return this.OCR;
    }


    //SETTERS
    public settext(text: string): void {
        this.text = text;
    }

    public setimagen(imagen: Buffer): void {
        this.imagen = imagen;
    }

    public setOCR(ocr: boolean): void {
        this.OCR = ocr;
    }
    

}