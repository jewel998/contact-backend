import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ContactService {
  constructor(private db: DatabaseService) {}

  create(tenantId: string, data: CreateContactDto, authUserId: string) {
    return this.db.contact.create({
      data: {
        tenantId,
        ...data,
        createdBy: authUserId,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Fetch all contacts with their relations.
   */
  findAll(tenantId: string) {
    return this.db.contact.findMany({
      where: { tenantId },
      include: {
        emails: true,
        phones: true,
        notes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Fetch a single contact by ID with details.
   */
  findOne(id: string) {
    return this.db.contact.findUnique({
      where: { id },
      include: {
        emails: true,
        phones: true,
        notes: true,
      },
    });
  }

  /**
   * Update a contact and its nested relations.
   */
  update(id: string, data: UpdateContactDto) {
    return this.db.contact.update({
      where: { id },
      data,
    });
  }

  /**
   * Remove a contact and cascade delete related emails, phones, notes.
   */
  remove(id: string) {
    return this.db.contact.delete({
      where: { id },
    });
  }
}
