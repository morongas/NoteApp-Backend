export class Optional<T>{
    private value: T | undefined;
    private assigned: boolean;

    constructor(value?: T) {
        this.value = value;
        if (this.value == undefined) {
            this.assigned = false;
        } else {
            this.assigned = true;
        }
    }

    hasvalue(): boolean {
        return this.assigned;
    }

    getValue(): T {
        if (!this.assigned) throw new Error();
        return <T>this.value;

    }
}