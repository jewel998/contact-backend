import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NoteService {
  constructor(private db: DatabaseService) {}

  /**
   * Create a note for a contact.
   */
  create(contactId: string, data: CreateNoteDto, authUserId: string) {
    return this.db.contactNote.create({
      data: {
        contactId,
        ...data,
        createdBy: authUserId,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Fetch all notes for a contact.
   */
  findAll(contactId: string) {
    return this.db.contactNote.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Fetch a single note by ID.
   */
  findOne(id: string) {
    return this.db.contactNote.findUnique({
      where: { id },
    });
  }

  /**
   * Update a note.
   */
  update(id: string, data: UpdateNoteDto, authUserId: string) {
    return this.db.contactNote.update({
      where: { id },
      data: {
        ...data,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Remove a note.
   */
  remove(id: string) {
    return this.db.contactNote.delete({
      where: { id },
    });
  }
}
