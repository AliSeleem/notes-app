import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './notes.schema';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async createNote(title: string, content: string, req: any) {
    try {
      const newNote = await this.noteModel.create({
        title,
        content,
        userId: req.user.id,
      });

      return { message: 'message created successfully', notes: newNote };
    } catch (e) {
      console.log(e);
      throw new Error('Failed to create note');
    }
  }

  async getUserNotes(
    userId: string,
    page: number = 1,
    limit: number = 10,
    search?: string,
  ) {
    const skip = (page - 1) * limit;
    const query: any = { userId };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, // Case-insensitive search for title
        { content: { $regex: search, $options: 'i' } }, // Case-insensitive search for content
      ];
    }

    const notes = await this.noteModel
      .find(query)
      .skip(skip) 
      .limit(limit)
      .lean()
      .exec();

    const total = await this.noteModel.countDocuments(query);

    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      notes,
    };
  }

  async getNoteById(noteId: string, userId: string) {
    const note = await this.noteModel
      .findOne({ _id: noteId, userId })
      .lean()
      .exec();
    if (!note) throw new NotFoundException('Note not found');
    return { notes: note };
  }

  async updateNote(
    noteId: string,
    toUpdateNote: Partial<Note>,
    userId: string,
  ) {
    try {
      let note = await this.noteModel
        .findOne({ _id: noteId, userId })
        .lean()
        .exec();
      if (!note) throw new NotFoundException('Note not found');
  
      Object.assign(note, toUpdateNote);
      note = await this.noteModel.findByIdAndUpdate(note._id, note)
      return { message: 'Note updated successfully', notes: note };
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException(err)
    }
  }

  async deleteNote(
    noteId: string,
    userId: string,
  ): Promise<{ message: string }> {
    const note = await this.noteModel
      .findOneAndDelete({ _id: noteId, userId })
      .lean()
      .exec();
    if (!note) throw new NotFoundException('Note not found');

    return { message: 'Note deleted successfully' };
  }
}
