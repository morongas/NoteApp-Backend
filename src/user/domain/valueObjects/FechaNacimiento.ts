export class FechaNacimiento{
    constructor(
        private fechaNacimiento: string
    ){}

    getFechaNacimiento(): string{
        return this.fechaNacimiento;
    }
}