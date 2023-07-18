import { Body, Controller, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { lateService } from "../application/lateService";
import { offline} from "src/note/infrastructure/interfaces/offline"
import { adapterDecorator } from "src/core/infrastructure/adapterDecorator";
import { concreteLogger } from "src/core/application/concretLogger";

@ApiTags('late')
@Controller('late')
export class lateController{
    aux: offline[];
    constructor(private readonly repo: lateService<string>,private  readonly repoLogger: adapterDecorator,) { }


    @Post()
    async create(@Body() body?, @Req() request?): Promise<string> {
        let auxx: offline[] = body.acciones;
        
        let resultado = await new concreteLogger(this.repo, this.repoLogger, "offline").execute(auxx);
        if (resultado.isLeft()) {
            return "No se pudo crear el late: "+resultado.getLeft();
        }else{
            return "Late cargado correctamente";
        } 
    }



}