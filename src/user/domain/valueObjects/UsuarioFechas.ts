export class UsuarioFechas{
    private fecha_nacimiento: Date;
    private fecha_suscripcion: Date;
    constructor(fecha_nacimiento){
        this.fecha_nacimiento = fecha_nacimiento;
        this.fecha_suscripcion = this.restarHoras(new Date(),4)
    }
    restarHoras(fecha, horas) {
        let milisegundos = fecha.getTime();
        var segundos = (horas * 60) * 60000;
        var nueva_fecha = new Date(milisegundos - segundos);
        return nueva_fecha;
    }

    getFechaNacimiento(): Date{
        return this.fecha_nacimiento
    }

    getFechaSuscripcion(): Date{
        return this.fecha_suscripcion
    }
}