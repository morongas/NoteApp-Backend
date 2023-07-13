import { IUser } from "../domain/repository/IUser";



export class getNotesByUserService<T>{
    private UserRepository: IUser<T>;
    constructor(repo: IUser<T>) {
        this.UserRepository = repo;
    }

    async execute(idUser: number): Promise<T>{
        let result = await this.UserRepository.getNotes(idUser);
        return result;
    }

}