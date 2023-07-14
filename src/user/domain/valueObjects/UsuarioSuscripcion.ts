enum Suscripcion{
    GRATIS,
    PREMIUM
}

export class UsuarioSuscripcion{

    public suscripcion : Suscripcion

    contructor(suscripcion : Suscripcion){
        this.suscripcion = suscripcion
    }

    getSuscripcion(): Suscripcion{
        return this.suscripcion;
    }
}