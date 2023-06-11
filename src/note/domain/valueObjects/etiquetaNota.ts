export class etiquetaNota {
    private etiqueta?: string;
    constructor(etiqueta: string) {
        this.etiqueta = etiqueta;
    }
    getEtiquetaNota(): string {
        return this.etiqueta;
    }
}