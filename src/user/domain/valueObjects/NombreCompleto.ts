export class NombreCompleto{
    private primer_nombre: string;
    private segundo_nombre: string;
    private nombre_completo: string;
    
    constructor(primer_nombre: string, segundo_nombre:string){
        this.primer_nombre = primer_nombre;
        this.segundo_nombre = segundo_nombre;
        this.nombre_completo = primer_nombre+" "+segundo_nombre;
    }

    getPrimerNombre(){
        return this.primer_nombre;
    }

    getSegundoNombre(){
        return this.segundo_nombre;
    }

    getNombreCompleto(){
        return this.nombre_completo;
    }

}
