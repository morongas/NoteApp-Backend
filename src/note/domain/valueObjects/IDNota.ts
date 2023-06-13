import { v4 as uuidv4 } from 'uuid';

export class IDNota{
    private idNota: string;
    private constructor(){
        this.idNota = uuidv4();
    }
    getIDNota(): string{
        return this.idNota;
    }
    static create(): IDNota{
        return new IDNota();
    }

}