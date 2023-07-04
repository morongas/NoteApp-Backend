import { Either } from "src/generics/Either";
import { UsuarioCredenciales } from "./valueObjects/UsuarioCredenciales";
import { UsuarioFechas } from "./valueObjects/UsuarioFechas";
import { UsuarioId } from "./valueObjects/UsuarioId";
import { UsuarioNombreCompleto } from "./valueObjects/UsuarioNombreCompleto";
import { UsuarioTelefono } from "./valueObjects/UsuarioTelefono";

export class Usuario{
    private constructor(
        public id: UsuarioId,
        public credenciales: UsuarioCredenciales,
        public nombres: UsuarioNombreCompleto,
        public fechas: UsuarioFechas,
        public telefono: UsuarioTelefono
    ){}

    static create(id: number, usuario: string, clave: string, email: string, primer_nombre: string, 
        segundo_nombre: string, fecha_nacimiento: Date, telefono: string): Either<Map<string,string>,Usuario>{
        const credencialesAux = UsuarioCredenciales.create(usuario,clave,email);
        
        if(credencialesAux.isLeft) return Either.makeLeft<Map<string,string>,Usuario>(credencialesAux.getLeft())
        
        return Either.makeRight<Map<string,string>,Usuario>(new Usuario(new UsuarioId(id),
        credencialesAux.getRight(), new UsuarioNombreCompleto(primer_nombre,segundo_nombre),
        new UsuarioFechas(fecha_nacimiento),new UsuarioTelefono(telefono)))
    }
  
}