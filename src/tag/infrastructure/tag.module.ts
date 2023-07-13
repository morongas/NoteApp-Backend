import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag_entity';
import { TagController } from './TagController';
import { CreateTagService } from '../application/createTagService';
import { adapterTagRepository } from './adapterTagRepository';
import { DeleteTagService } from '../application/deleteTagService';
import { UpdateTagService } from '../application/updateTagService';
import { NoteEntity } from 'src/note/infrastructure/entities/note_entity';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity, NoteEntity])],
  controllers: [TagController],
  providers: [CreateTagService,adapterTagRepository,{
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
