import { Either } from "src/generics/Either";
import { addBodyDto } from "src/note/application/dto/addBodyDto";
import { body } from "src/note/domain/entities/body";
import { bodyEntity } from "src/note/infrastructure/entities/body_entity";
import { bodyMotherObject } from "./MotherObject/bodyMotherObject";
import { addBodyToNoteService } from "src/note/application/addBodyToNoteService";



describe('CreateBodyService', () => {
    test('test_create_body_valid', async () => {
        //Arrange
        const createBodyService: addBodyToNoteService<bodyEntity> =
            bodyMotherObject.createBodyService();
        const dto: addBodyDto = bodyMotherObject.createBodyDtoValid();

        //Act
        const result: Either<Error, bodyEntity> = await createBodyService.execute(dto);

        //Assert
        expect(result.isRight()).toBeTruthy();
    });
    
    it('test_create_body_with_invalid_title', async () => {
        //Arrange
        const crearGrupoService = bodyMotherObject.createBodyService();
        const dto = bodyMotherObject.createBodyDtoInvalid();

        //Act
        const result = await crearGrupoService.execute(dto);

        //Assert
        expect(result.isLeft()).toBeTruthy();
    });
});