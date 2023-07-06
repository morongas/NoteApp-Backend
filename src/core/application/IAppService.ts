import { Either } from "src/generics/Either";


export interface IAppService<Tservice,R>{
   execute(d:Tservice): Promise<Either<Error,R>>;
}
