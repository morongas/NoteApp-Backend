import { Either } from "src/generics/Either";
import { Usuario } from "../Usuario";

export class UsuarioCredenciales {
    private constructor(
        public usuario: string,
        public clave: string,
        public email: string
    ){}

    getUsuario(): string{
        return this.usuario
    }

    getClave(): string{
        return this.clave
    }

    getEmail(): string{
        return this.email
    }

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

    public static create(usuario, clave, email): Either<string, UsuarioCredenciales>{
        const credenciales: UsuarioCredenciales = 
            new UsuarioCredenciales(usuario,clave,email)
        
        //Es verdadero si todas las credenciales estan bien
        if(credenciales.validarCredenciales()) return Either.makeRight<string,UsuarioCredenciales>(credenciales)

        if(!credenciales.validarClave()){
            return Either.makeLeft<string,UsuarioCredenciales>('La clave ingresada es incorrecta')
        } 
        return Either.makeLeft<string,UsuarioCredenciales>('Se ha ingresado un correo invalido')
    }
}