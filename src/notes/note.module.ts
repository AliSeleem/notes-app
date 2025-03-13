import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note, NoteSchema } from './notes.schema';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { JwtStrategy } from 'src/users/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NoteController],
  providers: [NoteService, JwtAuthGuard, JwtStrategy],
})
export class NoteModule {}
