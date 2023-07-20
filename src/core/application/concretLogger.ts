import { Either } from "src/generics/Either";
import { IAppService } from "./IAppService";
import { ILogger } from "./ILogger";
import { decorator } from "./decorator";

export class concreteLogger<Tservice, R> extends decorator<Tservice, R>{

    
    private logger: ILogger;

    constructor(service: IAppService<Tservice, R>, logger: ILogger, private action: string) {
        super(service);
        this.logger = logger;
        this.action = action;
    }

    async execute(d: Tservice): Promise<Either<Error,R>> {
        const result = await super.execute(d);
        let logResult : Either<Error,string>;
        if (result.isLeft()) {
            logResult = await this.logger.execute(this.action,result.getLeft().message);
        }else{
            logResult = await this.logger.execute(this.action,JSON.stringify(result.getRight()));
        }
        return result;
    }



}