import { Injectable } from "@nestjs/common";
import { Either } from "src/generics/Either";
import { NoteAggregate } from "../domain/noteAggregate";
import { InjectRepository } from "@nestjs/typeorm";
import { bodyEntity } from "./entities/body_entity";
import { Repository } from "typeorm";
import { IBody } from "../domain/repository/IBody";
import { body } from "../domain/entities/body";
import { Optional } from "src/generics/Optional";
import { NoteEntity } from "./entities/note_entity";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Console } from "console";
import { IValidar } from "src/user/domain/repository/IValidar";


@Injectable()
export class adapterBody implements IBody<bodyEntity>,IValidar{

    constructor(
        @InjectRepository(bodyEntity)
        private readonly repositorio: Repository<bodyEntity>,
        @InjectRepository(NoteEntity)
        private readonly repositorio2: Repository<NoteEntity>,
        @InjectRepository(UserEntity)
        private readonly repoUser: Repository<UserEntity>
    ){}
    

    async validarSuscripcion(usuarioId: number): Promise<Either<Error,boolean>>{
        
        const resultUser = await this.repoUser.find({ 
            where: {
                id: usuarioId
            }
        });
        if(resultUser.length===0) return Either.makeLeft<Error,boolean>(new Error('Usuario no'))

        if(resultUser[0].suscripcion=='Gratis'){
            const count = await this.repositorio.query(`select count(*) from "note" join "bodyNote" on "notaIdNota" = "idNota" where "ocr" = true and "userId" =`+resultUser[0].id+``)
            if(count[0].count>=6) return Either.makeRight<Error,boolean>(false)
        }
        return Either.makeRight<Error,boolean>(true)
    }

    async saveBody(body: body): Promise<Either<Error, bodyEntity>> {
        const result = await this.repositorio2.find({ 
            where: {
                idNota: body.getidNota()
            }, 
            relations: {
                user: true
            }
        });


        if(result.length == 0){
            return Either.makeLeft<Error,bodyEntity>((new Error('La nota no existe'))); 
        }

        if(body.getOCR()==true){
            const validacion = this.validarSuscripcion(result[0].user.id)
            let bool = await validacion
            if( bool.getRight()== false){
                return Either.makeLeft<Error, bodyEntity>(new Error('El usuario ya ha alcanzado el limite de uso de OCR para su suscripcion'))
            }
        }
            
        const aux: bodyEntity = {
           IDbody: body.getIDbody(),
           fechaBody: body.getfecha().getValue(),
           text: body.gettext().getValue(),
           imagen: body.getimagen().getValue(),
           nota: body.getidNota(),
           ocr: body.getOCR()
       };
        try{
            const resultado= await this.repositorio.save(aux);
            return Either.makeRight<Error,bodyEntity>(resultado);
        }catch(error){
            return Either.makeLeft<Error,bodyEntity>(error);
        }

    }
    async editBody(id: string, body: body): Promise<Either<Error, string>> {
        let bodyToUpdate : bodyEntity;
        bodyToUpdate = await this.repositorio.findOneBy({
            IDbody: id,
        })

        const bodynote = new Optional<bodyEntity>(bodyToUpdate);

        if(!bodynote.hasvalue()){
            return Either.makeLeft<Error,string>((new Error('El body no existe')));
        }

        bodyToUpdate.fechaBody = body.getfecha().getValue();
        bodyToUpdate.text = body.gettext().getValue();
        bodyToUpdate.imagen = body.getimagen().getValue();
        bodyToUpdate.ocr = body.getOCR();
        
        try{
            const resultado = await this.repositorio.save(bodyToUpdate);
            return Either.makeRight<Error,string>('Se cambio el body exitosamente');
        }catch(error){
            return Either.makeLeft<Error,string>(error);
        }
    }

    async deleteBody(id: string): Promise<Either<Error, string>> {
        let BodyToDelete: bodyEntity;
        BodyToDelete = await this.repositorio.findOneBy({
            IDbody: id,
        })

        const bodynote = new Optional<bodyEntity>(BodyToDelete);

        if (!bodynote.hasvalue()) {
            return Either.makeLeft<Error, string>((new Error('El body no existe')));
        }

        try {
            const resultado = await this.repositorio.delete(BodyToDelete);
            return Either.makeRight<Error, string>('Se elimino el body exitosamente');
        }catch (error) {
            return Either.makeLeft<Error, string>(error);
        }
    }
    
}