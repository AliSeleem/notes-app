import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './notes/note.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://engaliseleem:WV3r8aAvTGhrdrgU@cluster0.lpv2jlp.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0',
    ),
    NoteModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
