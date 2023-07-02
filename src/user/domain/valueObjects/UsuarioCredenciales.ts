import { Either } from "src/generics/Either";
import { Usuario } from "../Usuario";

export class UsuarioCredenciales {
    constructor(
        public usuario: string,
        public clave: string,
        public email: string
    ){}

    public validarEmail():Boolean{
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(this.email);
    }

    public validarClave(): Boolean{
        const expression: RegExp = /^(?=.*\d)(?=.*[-_!@#$%^&*?.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return expression.test(this.clave);
    }

    public validarCredenciales(): Boolean{
        return this.validarClave() && this.validarEmail()
    }

    public static create(usuario, clave, email): Either<Map<string,string>, UsuarioCredenciales>{
        const credenciales: UsuarioCredenciales = 
            new UsuarioCredenciales(usuario,clave,email)
        
        //Es verdadero si todas las credenciales estan bien
        if(credenciales.validarCredenciales()) return Either.makeRight<Map<string,string>,UsuarioCredenciales>(credenciales)

        let error = new Map<string,string>()

        if(!credenciales.validarClave()) error.set('Clave','La clave no cumple con el formato indicado')
        if(!credenciales.validarEmail()) error.set('Email','Se ha ingresado un correo invalido')
        
        return Either.makeLeft<Map<string,string>,UsuarioCredenciales>(error)
    }
}