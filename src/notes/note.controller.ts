import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard) // Protect all routes
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(
    @Body() body: { title: string; content: string },
    @Request() req,
  ) {
    return this.noteService.createNote(body.title, body.content, req);
  }

  @Get()
  async getUserNotes(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string,
  ) {
    return this.noteService.getUserNotes(
      req.user.id,
      Number(page),
      Number(limit),
      search,
    );
  }

  @Get(':id')
  async getNoteById(@Param('id') noteId: string, @Request() req) {
    return this.noteService.getNoteById(noteId, req.user.id);
  }

  @Patch(':id')
  async updateNote(
    @Param('id') noteId: string,
    @Body() body: { title: string; content: string },
    @Request() req,
  ) {
    return this.noteService.updateNote(noteId, body, req.user.id);
  }

  @Delete(':id')
  async deleteNote(@Param('id') noteId: string, @Request() req) {
    return this.noteService.deleteNote(noteId, req.user.id);
  }
}
