import { UsuarioCredenciales } from "./valueObjects/UsuarioCredenciales";
import { UsuarioFechas } from "./valueObjects/UsuarioFechas";
import { UsuarioId } from "./valueObjects/UsuarioId";
import { UsuarioNombreCompleto } from "./valueObjects/UsuarioNombreCompleto";
import { UsuarioTelefono } from "./valueObjects/UsuarioTelefono";

export class Usuario{
    constructor(
        public id: UsuarioId,
        public credenciales: UsuarioCredenciales,
        public nombres: UsuarioNombreCompleto,
        public fechas: UsuarioFechas,
        public telefono: UsuarioTelefono
    ){}

  
}