import { IAppService } from "src/core/application/IAppService";
import { IDNota } from "../domain/valueObjects/IDNota";
import { INotes } from "../domain/repository/INotes";
import { cuerpoNota } from "../domain/valueObjects/cuerpoNota";
import { estadoNota } from "../domain/valueObjects/estadoNota";
import { etiquetaNota } from "../domain/valueObjects/etiquetaNota";
import { fecha } from "../domain/valueObjects/fecha";
import { NoteAggregate } from "../domain/noteAggregate";
import { tituloNota } from "../domain/valueObjects/tituloNota";
import { CreateNoteDto } from "./dto/CreateNoteDto";
import { Either } from "../../generics/Either";
import { adapterNoteRepository } from "../infrastructure/adapterNoteRepository";
import { Inject } from "@nestjs/common";

export class createnoteService implements IAppService<CreateNoteDto, string>{
    private NotesRepository: INotes;
    constructor(@Inject(adapterNoteRepository)  repo: INotes) {
        this.NotesRepository = repo;
    }

    // Creamos la nota en el agregado
    async execute(dto: CreateNoteDto): Promise<Either<Error,string>> {
    
        //Creamos el agregado
        const nota = NoteAggregate.create(dto.fechaCreacion,dto.cuerpoText,dto.cuerpoImg,dto.etiqueta,dto.tituloNota,dto.estado);
        // Guardamos la nota en la base de datos
        if (nota.isLeft()) {
            return Either.makeLeft<Error,string>(new Error('No se puede crear la nota'));
        }else{
            let result = await this.NotesRepository.saveNota(nota.getRight());
            if(result.isLeft()){
                return result; 
            }
            return Either.makeRight<Error,string>("Resultado "+  result);
        }
        
        
    }
}