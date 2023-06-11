import { Optional } from "src/generics/Optional";

export class etiquetaNota {
    private etiqueta?: string;
    constructor(etiqueta: string) {
        this.etiqueta = etiqueta;
    }
    getEtiquetaNota(): Optional<string> {
        if(this.etiqueta == undefined){
            return new Optional<string>();
        }else{
            return new Optional<string>(this.etiqueta);
        }
    }
}