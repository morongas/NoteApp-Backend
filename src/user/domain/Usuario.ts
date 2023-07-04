import { Either } from "src/generics/Either";
import { UsuarioCredenciales } from "./valueObjects/UsuarioCredenciales";
import { UsuarioFechas } from "./valueObjects/UsuarioFechas";
import { UsuarioId } from "./valueObjects/UsuarioId";
import { UsuarioNombreCompleto } from "./valueObjects/UsuarioNombreCompleto";
import { UsuarioTelefono } from "./valueObjects/UsuarioTelefono";

export class Usuario{
    private constructor(
        public credenciales: UsuarioCredenciales,
        public nombres: UsuarioNombreCompleto,
        public fechas: UsuarioFechas,
        public telefono: UsuarioTelefono,
        public id?: UsuarioId|undefined
    ){}

    static create(usuario: string, clave: string, email: string, primer_nombre: string, 
        segundo_nombre: string, fecha_nacimiento: Date, telefono: string, id?: number): Either<Map<string,string>,Usuario>{
        const credencialesAux = UsuarioCredenciales.create(usuario,clave,email);
        
        if(credencialesAux.isLeft) return Either.makeLeft<Map<string,string>,Usuario>(credencialesAux.getLeft())
        
        return Either.makeRight<Map<string,string>,Usuario>(new Usuario(
        credencialesAux.getRight(), new UsuarioNombreCompleto(primer_nombre,segundo_nombre),
        new UsuarioFechas(fecha_nacimiento),new UsuarioTelefono(telefono)))
    }
  
}