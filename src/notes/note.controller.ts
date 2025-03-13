import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
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
  @UseGuards(JwtAuthGuard)
  async createNote(
    @Body() body: { title: string; content: string },
    @Req() req,
  ) {
    return this.noteService.createNote(body.title, body.content, req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserNotes(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return this.noteService.getUserNotes(
      req.user.id,
      Number(page),
      Number(limit),
      search,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getNoteById(@Param('id') noteId: string, @Req() req) {
    return this.noteService.getNoteById(noteId, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateNote(
    @Param('id') noteId: string,
    @Body() body: { title: string; content: string },
    @Req() req,
  ) {
    return this.noteService.updateNote(noteId, body, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteNote(@Param('id') noteId: string, @Req() req) {
    return this.noteService.deleteNote(noteId, req.user.id);
  }
}
