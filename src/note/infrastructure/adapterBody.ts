import { Injectable } from "@nestjs/common";
import { Either } from "src/generics/Either";
import { NoteAggregate } from "../domain/noteAggregate";
import { InjectRepository } from "@nestjs/typeorm";
import { bodyEntity } from "./entities/body_entity";
import { Repository } from "typeorm";
import { IBody } from "../domain/repository/IBody";
import { body } from "../domain/entities/body";


@Injectable()
export class adapterBody implements IBody{

    constructor(
        @InjectRepository(bodyEntity)
        private readonly repositorio: Repository<bodyEntity>,
    ){}
    
    async saveBody(body: body): Promise<Either<Error, string>> {
       const aux: bodyEntity = {
           IDbody: body.getIDbody(),
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
        throw new Error("Method not implemented.");
    }

   
}