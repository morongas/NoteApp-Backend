import { Repository } from "typeorm";
import { Either } from "../../generics/Either";
import { IDNota } from "../domain/valueObjects/IDNota";
import { INotes } from "../domain/repository/INotes";
import { NoteAggregate } from "../domain/noteAggregate";
import { NoteEntity } from "./entities/note_entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class adapterNoteRepository extends Repository<NoteEntity> implements INotes{

    async saveNota(nota: NoteAggregate): Promise<Either<string, Error>> {
        let aux2;

        if(nota.getetiquetaNota().getEtiquetaNota().hasvalue){
            aux2= nota.getetiquetaNota().getEtiquetaNota().getValue();
        }else{
            aux2= null;
        }
        const aux: NoteEntity = NoteEntity[
            nota.getid().getIDNota(),
            nota.getcuerpoNota().getcuerpoNotaText(),
            nota.getcuerpoNota().getcuerpoNotaImg(),
            nota.getestadoNota().getEstado(),
            aux2,
            nota.getfechaNota().getFecha(),
            nota.gettituloNota().getTituloNota()
        ];
        try{
            const resultado = await this.save(aux);
            return Either.makeLeft<string,Error>(resultado.tituloNota);
        }catch(error){
            return Either.makeRight<string,Error>(error.message);
        }
    }

    
    editNota(nota: IDNota): Promise<Either<NoteAggregate, Error>> {
        throw new Error("Method not implemented.");
    }

}
