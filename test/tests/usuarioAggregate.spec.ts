import { Either } from "src/generics/Either";
import { registrarUsuario } from "src/user/application/registrarUsuario";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { usuarioMotherObject } from "./MotherObject/usuarioMotherObject";
import { crearUsuarioDto } from "src/user/application/dto/crearUsuarioDto";




describe('usuarioAggregateTests', () => {
    test('test_crear_usuario_valido', async () => {
        //Arrange
        const registrarUsuario: registrarUsuario<UserEntity> =
            usuarioMotherObject.registrarUsuarioService()
        const dto: crearUsuarioDto = usuarioMotherObject.crearUsuarioValido();

        //Act
        const result: Either<Error, UserEntity> = await registrarUsuario.execute(dto);

        //Assert
        expect(result.isRight()).toBeTruthy();
    });
    
    it('test_crear_usuario_con_email_invalido', async () => {
        //Arrange
        const registrarUsuario: registrarUsuario<UserEntity> =
            usuarioMotherObject.registrarUsuarioService()
            const dto: crearUsuarioDto = usuarioMotherObject.crearUsuarioDtoEmailInvalido();

        //Act
        const result: Either<Error, UserEntity> = await registrarUsuario.execute(dto);

        //Assert
        expect(result.isLeft()).toBeTruthy();
    });

    it('test_crear_usuario_con_clave_invalida', async () => {
        //Arrange
        const registrarUsuario: registrarUsuario<UserEntity> =
            usuarioMotherObject.registrarUsuarioService()
            const dto: crearUsuarioDto = usuarioMotherObject.crearUsuarioDtoClaveInvalido();

        //Act
        const result: Either<Error, UserEntity> = await registrarUsuario.execute(dto);

        //Assert
        expect(result.isLeft()).toBeTruthy();
    });
});