export class crearUsuarioDto{
    constructor(
        public usuario: string,
        public clave: string,
        public email: string,
        public primer_nombre: string,
        public segundo_nombre: string,
        public fecha_nacimiento: Date,
        public telefono: string
    ){}
}