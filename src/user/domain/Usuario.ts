import { Either } from "src/generics/Either";
import { UsuarioCredenciales } from "./valueObjects/UsuarioCredenciales";
import { UsuarioFechas } from "./valueObjects/UsuarioFechas";
import { UsuarioId } from "./valueObjects/UsuarioId";
import { UsuarioNombreCompleto } from "./valueObjects/UsuarioNombreCompleto";
import { UsuarioTelefono } from "./valueObjects/UsuarioTelefono";
import { UsuarioSuscripcion } from "./valueObjects/UsuarioSuscripcion";

export class Usuario{
    private constructor(
        public credenciales: UsuarioCredenciales,
        public nombres: UsuarioNombreCompleto,
        public fechas: UsuarioFechas,
        public telefono: UsuarioTelefono,
        public suscripcion: UsuarioSuscripcion,
        public id?: UsuarioId|undefined
    ){}

    getCredenciales(): UsuarioCredenciales{
        return this.credenciales
    }
    getNombres(): UsuarioNombreCompleto{
        return this.nombres
    }
    getFechas(): UsuarioFechas{
        return this.fechas
    }
    getTelefono(): UsuarioTelefono{
        return this.telefono
    }
    getSuscripcion():UsuarioSuscripcion{
        return this.suscripcion
    }

    static create(usuario: string, clave: string, email: string, primer_nombre: string, 
        segundo_nombre: string, fecha_nacimiento: Date, telefono: string, suscripcion: string, id?: number): Either<string,Usuario>{
        const credencialesAux = UsuarioCredenciales.create(usuario,clave,email);
        if(credencialesAux.isLeft()) return Either.makeLeft<string,Usuario>(credencialesAux.getLeft())
        return Either.makeRight<string,Usuario>(new Usuario(
        credencialesAux.getRight(), new UsuarioNombreCompleto(primer_nombre,segundo_nombre),
        new UsuarioFechas(fecha_nacimiento),new UsuarioTelefono(telefono), new UsuarioSuscripcion(suscripcion)))
    }
  
}