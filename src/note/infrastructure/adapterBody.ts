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


@Injectable()
export class adapterBody implements IBody{

    constructor(
        @InjectRepository(bodyEntity)
        private readonly repositorio: Repository<bodyEntity>,
        @InjectRepository(NoteEntity)
        private readonly repositorio2: Repository<NoteEntity>
    ){}
    
    async saveBody(body: body): Promise<Either<Error, string>> {
        const result = await this.repositorio2.find({ 
            where: {
                idNota: body.getidNota()
            }, 
            relations: {
                task: true
            }
        }); 

        if (result[0].task.length != 0) {
            return Either.makeLeft<Error,string>((new Error('Esta nota ya tiene tareas asignadas')));
        } 

       const aux: bodyEntity = {
           IDbody: body.getIDbody(),
           fechaBody: body.getfecha().getValue(),
           text: body.gettext().getValue(),
           imagen: body.getimagen().getValue(),
           nota: body.getidNota()
       };
        try{
            const resultado = await this.repositorio.save(aux);
            return Either.makeRight<Error,string>(resultado.text);
        }catch(error){
            return Either.makeLeft<Error,string>(error);
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
        
        try{
            const resultado = await this.repositorio.save(bodyToUpdate);
            return Either.makeRight<Error,string>('Se cambio el body exitosamente');
        }catch(error){
            return Either.makeLeft<Error,string>(error);
        }
    }
    
}