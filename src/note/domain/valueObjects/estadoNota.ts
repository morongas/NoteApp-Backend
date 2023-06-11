export class estadoNota{
    estado: string;
    constructor(estado: string){
        this.estado = estado;
    }
    getEstado(): string{
        return this.estado;
    }

}