import { EtiquetaId } from "./ValueObjects/EtiquetaId";
import { NombreEtiqueta } from "./ValueObjects/NombreEtiqueta";

export class Etiqueta{
    constructor(
        public id: EtiquetaId,
        public nombre: NombreEtiqueta
        ){}

    public getId(): EtiquetaId{
        return this.id
    }

    public getNombre(): NombreEtiqueta{
        return this.nombre
    }
}