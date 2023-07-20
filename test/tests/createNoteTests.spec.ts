import { Either } from "src/generics/Either";
import { CreateNoteDto } from "src/note/application/dto/CreateNoteDto";
import { NoteAggregate } from "src/note/domain/noteAggregate";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { noteMotherObject } from "./MotherObject/noteMotherObject";
import { createnoteService } from "src/note/application/createNoteService";




describe('CreateNoteService', () => {
    test('test_create_note_valid', async () => {
        //Arrange
        const createNoteService: createnoteService<NoteEntity> =
            noteMotherObject.createNoteService();
        const dto: CreateNoteDto = noteMotherObject.createNoteDtoValid();

        //Act
        const result: Either<Error, NoteEntity> = await createNoteService.execute(dto);

        //Assert
        expect(result.isRight()).toBeTruthy();
    });
    
    it('test_create_note_with_invalid_title', async () => {
        //Arrange
        const crearGrupoService = noteMotherObject.createNoteService();
        const dto = noteMotherObject.createNoteDtoInvalid();

        //Act
        const result = await crearGrupoService.execute(dto);

        //Assert
        expect(result.isLeft()).toBeTruthy();
    });
});