export class UsuarioClave{
    constructor(
        private clave: string
    ){}

    getClave(): string{
        return this.clave;
    }
}