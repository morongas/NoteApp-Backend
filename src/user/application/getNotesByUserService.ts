import { IUser } from "../domain/repository/IUser";
import { Inject, Injectable } from "@nestjs/common";



@Injectable()
export class getNotesByUserService<T,Q>{
    private UserRepository: IUser<T,Q>;
    constructor(@Inject('IUser<T>')  repo: IUser<T,Q>) {
        this.UserRepository = repo;
    }

    async execute(idUser: string): Promise<T>{
        let result = await this.UserRepository.getNotes(idUser);
        return result;
    }

}