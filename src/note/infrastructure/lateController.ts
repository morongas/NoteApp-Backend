import { Body, Controller, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { lateService } from "../application/lateService";
import { offline} from "src/note/infrastructure/interfaces/offline"

@ApiTags('late')
@Controller('late')
export class lateController{
    aux: offline[];
    constructor(private readonly repo: lateService) { }


    @Post()
    async create(@Body() body?, @Req() request?): Promise<string> {
        let auxx: offline[] = body.acciones;
    
        console.log(auxx)
        
        let resultado = await this.repo.execute(auxx);
        if (resultado.isLeft()) {
            return "No se pudo crear el lay: "+resultado.getLeft();
        }else{
            return "Lay creado";
        }
    }



}