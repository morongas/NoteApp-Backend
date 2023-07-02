import { v4 as uuidv4 } from 'uuid';


export class IDTask {
    private id: string;

    constructor(id?: string) {
        if (id===undefined) {
            this.id = uuidv4();
        } else {
            this.id = id;
        }
    }

    public getId(): string {
        return this.id;
    }

    static  createId(id?): IDTask {
        return new IDTask(id);
    }
}
