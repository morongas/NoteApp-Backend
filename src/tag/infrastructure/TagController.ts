import { Body, Controller, Post } from "@nestjs/common";
import { CreateTagService } from "../application/createTagService";
import { createTagDto } from "../application/dto/createTagDto";

@Controller('tag')
export class TagController{
    constructor(
        private readonly createRepo: CreateTagService
    ){}

    @Post()
    async create(@Body() createTagDto: createTagDto): Promise<string>{
        return
    }
}