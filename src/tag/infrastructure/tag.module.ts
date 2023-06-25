import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag_entity';
import { TagController } from './TagController';
import { CreateTagService } from '../application/createTagService';
import { adapterTagRepository } from './adapterTagRepository';
import { DeleteTagService } from '../application/deleteTagService';
import { UpdateTagService } from '../application/updateTagService';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [CreateTagService,{
    provide: 'IEtiqueta',
    useClass: adapterTagRepository
  }, DeleteTagService,{
    provide: 'IEtiqueta',
    useClass: adapterTagRepository
  }, UpdateTagService,{
    provide: 'IEtiqueta',
    useClass: adapterTagRepository
  }]
})
export class TagModule {}
