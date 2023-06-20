import { IUser } from "../domain/repository/IUser";
import { Inject, Injectable } from "@nestjs/common";



@Injectable()
export class getNotesByUserService<T>{
    private UserRepository: IUser<T>;
    constructor(@Inject('IUser<T>')  repo: IUser<T>) {
        this.UserRepository = repo;
    }

    async execute(idUser: string): Promise<T>{
        let result = await this.UserRepository.getNotes(idUser);
        return result;
    }

}