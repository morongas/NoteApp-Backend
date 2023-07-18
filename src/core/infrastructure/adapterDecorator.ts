import { Either } from "src/generics/Either";
import { ILogger } from "../application/ILogger";
import { logg_entity } from "src/note/infrastructure/entities/logg_entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class adapterDecorator implements ILogger{
    constructor(
        @InjectRepository(logg_entity)
        private readonly repositorio: Repository<logg_entity>,
    ) { }

    async execute(action: string,result: string): Promise<Either<Error, string>> {
        const aux : logg_entity = {
            action: action,
            IDLog: uuidv4(),
            result: result,
        };

        try {
            const resultado = await this.repositorio.save(aux);
            return Either.makeRight<Error, string>(action);
        } catch (error) {
            return Either.makeLeft<Error, string>(error);
        }
    }
}


