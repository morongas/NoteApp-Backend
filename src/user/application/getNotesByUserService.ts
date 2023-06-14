import { IUser } from "../domain/repository/IUser";
import { UsuarioId } from "../domain/valueObjects/UsuarioId";
import { adapterUserRepository } from "../infrastructure/user.adapter";
import { Inject } from "@nestjs/common";
import { Either } from "../../generics/Either";


export class getNotesByUserService<T>{
    private UserRepository: IUser<T>;
    constructor(@Inject(adapterUserRepository)  repo: IUser<T>) {
        this.UserRepository = repo;
    }

    async execute(idUser: string): Promise<T>{
        let result = await this.UserRepository.getNotes(idUser);
        return result;
    }

}