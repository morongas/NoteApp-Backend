import { v4 as uuidv4 } from 'uuid';

export class IDNota{
    private idNota: string;
    private constructor(id?: string){
        if(id===undefined){
            this.idNota = uuidv4();
        }else{
            this.idNota = id;
        }
    }
    getIDNota(): string{
        return this.idNota;
    }
    static create(id?:string): IDNota{
        return new IDNota(id);
    }

    static create2(id:string): IDNota{
        return new IDNota(id);
    }

}