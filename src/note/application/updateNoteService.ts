import { IAppService } from "src/core/application/IAppService";
import { INotes } from "../domain/repository/INotes";
import { NoteAggregate } from "../domain/noteAggregate";
import { Either } from "../../generics/Either";
import { UpdateNoteDto } from "./dto/UpdateNoteDto";


export class updatenoteService<T> implements IAppService<UpdateNoteDto, string>{
    private NotesRepository: INotes<T>;
    constructor(repo: INotes<T>) {
        this.NotesRepository = repo;
    }

    // Creamos la nota en el agregado
    async execute(dto: UpdateNoteDto): Promise<Either<Error,string>> {  
        //Creamos el agregado
        const nota = NoteAggregate.create(dto.tituloNota,dto.fechaCreacion,undefined,undefined,undefined,dto.estado,dto.descrip);
        // Guardamos la nota en la base de datos
        if (nota.isLeft()) {
            return Either.makeLeft<Error,string>(new Error(nota.getLeft().message));
        }else{
            let result = await this.NotesRepository.editNota(dto.idNota, nota.getRight());
            if(result.isLeft()){
                return result; 
            }
            return Either.makeRight<Error,string>("Resultado "+  result);
        }   
    }
}