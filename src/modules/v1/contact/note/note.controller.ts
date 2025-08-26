import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('/api/v1/contact/:contactId/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('/')
  create(
    @Param('contactId') contactId: string,
    @Auth('uid') authUserId: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.noteService.create(contactId, createNoteDto, authUserId);
  }

  @Get('/')
  findAll(@Param('contactId') contactId: string) {
    return this.noteService.findAll(contactId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Auth('uid') authUserId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(id, updateNoteDto, authUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
