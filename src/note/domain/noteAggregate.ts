import { IDNota } from "./valueObjects/IDNota";
import { cuerpoNota } from "./valueObjects/cuerpoNota";
import { estadoNota } from "./valueObjects/estadoNota";
import { etiquetaNota } from "./valueObjects/etiquetaNota";
import { fecha } from "./valueObjects/fecha";
import { tituloNota } from "./valueObjects/tituloNota";

export class NoteAggregate{

    private idNota: IDNota;
    private cuerpoNota?: cuerpoNota;
    private etiqueta?: etiquetaNota;
    private tituloNota?: tituloNota;
    private fechaCreacion: fecha;
    private estado?: estadoNota;

    constructor(idNota: IDNota, fechaCreacion: fecha, etiqueta?: etiquetaNota, titulo?: tituloNota, estado?: estadoNota,
        cuerpoNota?: cuerpoNota) {
        this.idNota = idNota;
        this.cuerpoNota = cuerpoNota;
        this.etiqueta = etiqueta;
        this.tituloNota = titulo;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        
    }

    static create(idNota: IDNota, fechaCreacion: fecha, etiqueta?: etiquetaNota, titulo?: tituloNota, estado?: estadoNota,
        cuerpoNota?: cuerpoNota): NoteAggregate {
        return new NoteAggregate(idNota, fechaCreacion, etiqueta, titulo, estado, cuerpoNota);
    }

    //GETTERS
    public getid(): IDNota {
        return this.idNota;
    }

    public getcuerpoNota(): cuerpoNota {
        return this.cuerpoNota;
    }

    public getetiquetaNota(): etiquetaNota {
        return this.etiqueta;
    }

    public gettituloNota(): tituloNota {
        return this.tituloNota;
    }

    public getfechaNota(): fecha {
        return this.fechaCreacion;
    }

    public getestadoNota(): estadoNota {
        return this.estado;
    }

}
