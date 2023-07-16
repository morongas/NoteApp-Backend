import { ApiProperty } from "@nestjs/swagger";

export class crearUsuarioDto{

        @ApiProperty()
        public usuario: string;
        @ApiProperty()
        public clave: string;
        @ApiProperty()
        public email: string;
        @ApiProperty()
        public suscripcion_gratis: boolean;
        @ApiProperty()
        public primer_nombre: string;
        @ApiProperty()
        public segundo_nombre: string;
        @ApiProperty()
        public fecha_nacimiento: Date;
        @ApiProperty()
        public telefono: string;

        constructor(usuario:string, clave:string, email: string, primer_nombre: string,
            segundo_nombre: string, fecha_nacimiento: Date, telefono: string, suscripcion_gratis: boolean){
                this.usuario = usuario;
                this.clave = clave;
                this.email = email;
                this.primer_nombre = primer_nombre;
                this.segundo_nombre = segundo_nombre;
                this.fecha_nacimiento = fecha_nacimiento
                this.telefono = telefono;
                this.suscripcion_gratis = suscripcion_gratis;

        }

}