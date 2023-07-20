import { createnoteService } from "src/note/application/createNoteService";
import { CreateNoteDto } from "src/note/application/dto/CreateNoteDto";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { mocksNote } from "../Mocks/mocksNote";

export class noteMotherObject {
    public static createNoteDtoValid(): CreateNoteDto {
        let titulo = "Prueba valida";
        let fechaC = new Date();
        let latidud = 90;
        let longitud = 180;
        let descripcionGps = "Prueba de descripcion";
        let est = "Activo";
        let descripcion = "Prueba de descripcion";
        let idUsuario = 1;
        const dto = new CreateNoteDto(titulo, fechaC, latidud, longitud, descripcionGps, est, descripcion, idUsuario);
        return dto;
    }
    public static createNoteDtoInvalid(): CreateNoteDto {
        let titulo = null;
        let fechaC = new Date();
        let latidud = 90;
        let longitud = 180;
        let descripcionGps = "Prueba de invalida";
        let est = "Activo";
        let descripcion = "Prueba de invalida";
        let idUsuario = 1;
        const dto = new CreateNoteDto(titulo, fechaC, latidud, longitud, descripcionGps, est, descripcion, idUsuario);
        return dto;
    }

    public static createNoteService(): createnoteService<NoteEntity> {
        const mock: mocksNote = new mocksNote();
        const service = new createnoteService(mock);
        return service
    }
}