import { v4 as uuidv4 } from 'uuid';

export class EtiquetaId{
    private idEtiqueta: string;
    private constructor(idEtiqueta?: string){
        if(idEtiqueta===undefined){
            this.idEtiqueta = uuidv4();
        }else{
            this.idEtiqueta = idEtiqueta;
        }
    }
    getid(): string{
        return this.idEtiqueta;
    }
    static create(idEtiqueta?:string): EtiquetaId{
        return new EtiquetaId(idEtiqueta);
    }

}