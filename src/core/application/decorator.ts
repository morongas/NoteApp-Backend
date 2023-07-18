import { Either } from "src/generics/Either";
import { IAppService } from "./IAppService";

export abstract class decorator<Tservice, R> implements IAppService<Tservice, R> {
    private service: IAppService<Tservice, R>;  

    constructor(service: IAppService<Tservice, R>) { 
        this.service = service;
    }
    
    async execute(d: Tservice): Promise<Either<Error, R>> {
        return this.service.execute(d);
    }
}