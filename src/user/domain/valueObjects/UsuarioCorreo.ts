export class UsuarioCorreo{
    constructor(
        private correo: string
    ){}

    getCorreo(): string{
        return this.correo;
    }
}