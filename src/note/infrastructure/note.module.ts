import { Module } from '@nestjs/common';
import { NoteController } from './NoteController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleAsyncConfig } from 'src/configDatabase';
import { adapterNoteRepository } from './adapterNoteRepository';
import { INotes } from '../domain/repository/INotes';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(TypeOrmModuleAsyncConfig)
  ],
  controllers: [NoteController],
  providers: [adapterNoteRepository]
})
export class NoteModule {}
