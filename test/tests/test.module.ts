import { Module, forwardRef } from '@nestjs/common';
import { NoteModule } from 'src/note/infrastructure/note.module';
import { noteMotherObject } from './MotherObject/noteMotherObject';
import { mocksNote } from './Mocks/mocksNote';
import { AppModule } from 'src/app.module';
import { updatenoteService } from 'src/note/application/updateNoteService';
import { createnoteService } from 'src/note/application/createNoteService';

@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => NoteModule),
    ], // Importa tus módulos aquí
    providers: [
        noteMotherObject, mocksNote, createnoteService, updatenoteService],
    exports: [noteMotherObject],
})
export class TestModule { }
