import { FechaNacimiento } from "./valueObjects/FechaNacimiento";
import { NombreCompleto } from "./valueObjects/NombreCompleto";
import { Username } from "./valueObjects/Username";
import { UsuarioClave } from "./valueObjects/UsuarioClave";
import { UsuarioCorreo } from "./valueObjects/UsuarioCorreo";
import { UsuarioId } from "./valueObjects/UsuarioId";

export class Usuario{
    constructor(
        public id: UsuarioId,
        public nombre: NombreCompleto,
        public clave: UsuarioClave,
        public usuario: Username,
        public correo: UsuarioCorreo,
        public nacimiento: FechaNacimiento
    ){}

  
}