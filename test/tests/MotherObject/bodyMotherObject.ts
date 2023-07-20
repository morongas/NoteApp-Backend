import { addBodyToNoteService } from "src/note/application/addBodyToNoteService";
import { addBodyDto } from "src/note/application/dto/addBodyDto";
import { bodyEntity } from "src/note/infrastructure/entities/body_entity";
import { mocksBody } from "../Mocks/mocksBody";
import { IDNota } from "src/note/domain/valueObjects/IDNota";

export class bodyMotherObject {
    public static createBodyDtoValid(): addBodyDto {
        let idNota = IDNota.create().getIDNota();
        let fecha = "2023-07-17";
        let text = "Prueba valida";
        let file = {};
        let ocr = true;
        const dto = new addBodyDto(idNota, fecha, ocr, text, file);
        return dto;
    }
    public static createBodyDtoInvalid(): addBodyDto {
        let idNota = IDNota.create().getIDNota();
        let fecha = "2023-07-17";
        let text = "Prueba invalida";
        let file = {};
        let ocr = true;
        const dto = new addBodyDto(idNota, fecha, ocr, text, file);
        return dto;
    }

    public static createBodyService(): addBodyToNoteService<bodyEntity> {
        const mock: mocksBody = new mocksBody();
        const service = new addBodyToNoteService(mock);
        return service
    }
}