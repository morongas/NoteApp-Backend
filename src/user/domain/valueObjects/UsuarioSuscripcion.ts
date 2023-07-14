export class UsuarioSuscripcion{
    constructor(private suscripcion : string)
    {}

    public getSuscripcion(): string{
        return this.suscripcion;
    }
}