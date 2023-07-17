import { Either } from "src/generics/Either";

export class gpsNota{
    private latitud: number;
    private longitud: number;
    private descripcion?: string;
    private constructor(latitud:number,longitud:number,descripcion?: string){
        this.latitud = latitud;
        this.longitud = longitud;
        this.descripcion = descripcion;
    }

    getlatitud(): number{
        return this.latitud;
    }

    getlongitud(): number{
        return this.longitud;
    }

    getdescripcion(): string{
        return this.descripcion;
    }

   
    static create(latitud: number, longitud: number, descripcion?: string): Either<Error,gpsNota>{
        if(latitud === undefined || longitud === undefined){
            return Either.makeLeft<Error,gpsNota>(new Error('La nota debe tener latitud y longitud'));
        }
        if(latitud < -90 || latitud > 90){
            return Either.makeLeft<Error,gpsNota>(new Error('La latitud debe estar en el rango de -90 a 90'));
        }
        if(longitud < -180 || longitud > 180){
            return Either.makeLeft<Error,gpsNota>(new Error('La longitud debe estar en el rango de -180 a 180'));
        }
        return Either.makeRight<Error,gpsNota>(new gpsNota(latitud,longitud,descripcion));
    }
}