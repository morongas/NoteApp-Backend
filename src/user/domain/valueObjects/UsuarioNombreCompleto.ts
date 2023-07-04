export class UsuarioNombreCompleto{

    private nombre_completo: string
    private primer_nombre: string
    private segundo_nombre: string
    constructor(primer_nombre: string, segundo_nombre: string){
        this.primer_nombre = primer_nombre;
        this.segundo_nombre = segundo_nombre;
        this.nombre_completo = primer_nombre ||' '||segundo_nombre;   
    }

    public getPrimerNombre(): string{
        return this.primer_nombre
    }

    public getSegundoNombre(): string{
        return this.segundo_nombre
    }

    public getNombreCompleto(): string{
        return this.nombre_completo
    }
}