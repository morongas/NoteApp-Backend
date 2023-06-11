import { Optional } from "src/generics/Optional";

export class cuerpoNota{
    private cuerpoText: string;
    private cuerpoImg: string;
    constructor(texto?: string, imagen?: string) {
        this.cuerpoText = texto;
        this.cuerpoImg = imagen;
    }
    public getcuerpoNotaText(): string{
        return this.cuerpoText;
    }

    //PENDIENTE
    public getcuerpoNotaImg(): string {
        return this.cuerpoImg;
    }


}