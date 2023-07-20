import { createnoteService } from "src/note/application/createNoteService";
import { mocksNote } from "../Mocks/mocksNote";
import { crearUsuarioDto } from "src/user/application/dto/crearUsuarioDto";
import { registrarUsuario } from "src/user/application/registrarUsuario";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { mocksUsuario } from "../Mocks/mocksUsuario";

export class usuarioMotherObject {
    public static crearUsuarioValido(): crearUsuarioDto {
        let usuario = "jerojash";
        let clave = "123ClaveValida123*"
        let email = "email@gmail.com";
        let suscripcion_gratis = false;
        let primer_nombre = "Javier";
        let segundo_nombre = "QA";
        let fecha_nacimiento = new Date();
        let telefono = "042611087";
        const dto = new crearUsuarioDto(usuario, clave, email, primer_nombre, segundo_nombre, fecha_nacimiento, 
            telefono, suscripcion_gratis);
        return dto;
    }
    public static crearUsuarioDtoClaveInvalido(): crearUsuarioDto {
        let usuario = "jerojash";
        let clave = "clave"
        let email = "email@gmail.com";
        let suscripcion_gratis = false;
        let primer_nombre = "Javier";
        let segundo_nombre = "QA";
        let fecha_nacimiento = new Date();
        let telefono = "042611087";
        const dto = new crearUsuarioDto(usuario, clave, email, primer_nombre, segundo_nombre, fecha_nacimiento, 
            telefono, suscripcion_gratis);
        return dto;
    }

    public static crearUsuarioDtoEmailInvalido(): crearUsuarioDto {
        let usuario = "jerojash";
        let clave = "123ClaveValida123"
        let email = "email@gmail";
        let suscripcion_gratis = false;
        let primer_nombre = "Javier";
        let segundo_nombre = "QA";
        let fecha_nacimiento = new Date();
        let telefono = "042611087";
        const dto = new crearUsuarioDto(usuario, clave, email, primer_nombre, segundo_nombre, fecha_nacimiento, 
            telefono, suscripcion_gratis);
        return dto;
    }

    public static registrarUsuarioService(): registrarUsuario<UserEntity> {
        const mock: mocksUsuario = new mocksUsuario();
        const service = new registrarUsuario(mock);
        return service
    }
}