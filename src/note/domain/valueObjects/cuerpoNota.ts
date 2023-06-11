import { Optional } from "src/generics/Optional";

export class cuerpoNota{
    private cuerpoText?: string;
    private cuerpoImg?: string;
    constructor(texto?: string, imagen?: string) {
        this.cuerpoText = texto;
        this.cuerpoImg = imagen;
    }
    public getcuerpoNotaText(): Optional<string> {
        if (this.cuerpoText == undefined) {
            return new Optional<string>();
        }else{
            return new Optional<string>(this.cuerpoText);
        }
    }

    //PENDIENTE
    public getcuerpoNotaImg(): Optional<string> {
        if (this.cuerpoImg == undefined) {
            return new Optional<string>();
        }else{
            return new Optional<string>(this.cuerpoImg);
        }
    }


}