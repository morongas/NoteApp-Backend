export class tituloNota {
    private tituloNota: string;
    constructor(tituloNota: string) {
        this.tituloNota = tituloNota;
    }
    getTituloNota(): string {
        return this.tituloNota;
    }
}