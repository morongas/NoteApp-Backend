import { v4 as uuidv4 } from 'uuid';

export class IDNota{
    private idNota: string;
    constructor(){
        this.idNota = uuidv4();
    }
    getIDNota(): string{
        return this.idNota;
    }
}