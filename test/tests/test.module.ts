import { Module, forwardRef } from '@nestjs/common';
import { NoteModule } from 'src/note/infrastructure/note.module';
import { noteMotherObject } from './MotherObject/noteMotherObject';
import { mocksNote } from './Mocks/mocksNote';
import { AppModule } from 'src/app.module';
import { updatenoteService } from 'src/note/application/updateNoteService';
import { createnoteService } from 'src/note/application/createNoteService';
import { bodyMotherObject } from './MotherObject/bodyMotherObject';
import { mocksBody } from './Mocks/mocksBody';
import { addBodyToNoteService } from 'src/note/application/addBodyToNoteService';
import { updateBodyFromNoteService } from 'src/note/application/updateBodyFromNoteService';

@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => NoteModule),
    ], // Importa tus módulos aquí
    providers: [
        noteMotherObject, mocksNote, createnoteService, updatenoteService, bodyMotherObject, mocksBody, addBodyToNoteService, updateBodyFromNoteService],
    exports: [noteMotherObject,bodyMotherObject],
})
export class TestModule { }
