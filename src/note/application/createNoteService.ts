import { IAppService } from "src/core/application/IAppService";
import { INotes } from "../domain/repository/INotes";
import { NoteAggregate } from "../domain/noteAggregate";
import { CreateNoteDto } from "./dto/CreateNoteDto";
import { Either } from "../../generics/Either";



export class createnoteService implements IAppService<CreateNoteDto, string>{
    private NotesRepository: INotes;
    constructor(repo: INotes) {
        this.NotesRepository = repo;
    }


    // Creamos la nota en el agregado
    async execute(dto: CreateNoteDto): Promise<Either<Error,string>> {
    
        //Creamos el agregado
        const nota = NoteAggregate.create(dto.tituloNota, dto.fechaCreacion,dto.latitud,dto.longitud,dto.descripcionGPS,dto.estado,dto.descrip,undefined,dto.idUsuario);
        // Guardamos la nota en la base de datos
        if (nota.isLeft()) {
            return Either.makeLeft<Error,string>(new Error(nota.getLeft().message));
        }else{
            let result = await this.NotesRepository.saveNota(nota.getRight());
            if(result.isLeft()){
                return result; 
            }
            return Either.makeRight<Error,string>(result.getRight());
        }
        
        
    }
}