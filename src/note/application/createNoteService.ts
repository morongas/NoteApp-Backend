import { IAppService } from "src/core/application/IAppService";
import { IDNota } from "../domain/valueObjects/IDNota";
import { INotes } from "../domain/repository/INotes";
import { cuerpoNota } from "../domain/valueObjects/cuerpoNota";
import { estadoNota } from "../domain/valueObjects/estadoNota";
import { etiquetaNota } from "../domain/valueObjects/etiquetaNota";
import { fecha } from "../domain/valueObjects/fecha";
import { NoteAggregate } from "../domain/noteAggregate";
import { tituloNota } from "../domain/valueObjects/tituloNota";
import { CreateNoteDto } from "../infrastructure/dto/CreateNoteDto";
import { Either } from "../../generics/Either";

class createnoteService implements IAppService<CreateNoteDto, string>{

    constructor(private readonly NotesRepository: INotes) { }

    // Creamos la nota en el agregado
    async execute(dto: CreateNoteDto): Promise<Either<string,Error>> {
        const nota = NoteAggregate.create(new IDNota(),
            new fecha(dto.fechaCreacion),
            new etiquetaNota(dto.etiqueta),
            new tituloNota(dto.tituloNota),
            new estadoNota(dto.estado),
            new cuerpoNota(dto.cuerpoText, dto.cuerpoImg)
        );
        
        // Guardamos la nota en la base de datos
        return await this.NotesRepository.saveNota(nota);
    }
}