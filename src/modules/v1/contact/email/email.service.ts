import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmailService {
  constructor(private db: DatabaseService) {}

  create(contactId: string, data: CreateEmailDto, authUserId: string) {
    return this.db.contactEmail.create({
      data: {
        contactId,
        ...data,
        createdBy: authUserId,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Fetch all emails for a contact.
   */
  findAll(contactId: string) {
    return this.db.contactEmail.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Fetch a single email by ID.
   */
  findOne(id: string) {
    return this.db.contactEmail.findUnique({
      where: { id },
    });
  }

  /**
   * Update an email.
   */
  update(id: string, data: UpdateEmailDto, authUserId: string) {
    return this.db.contactEmail.update({
      where: { id },
      data: {
        ...data,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Remove an email.
   */
  remove(id: string) {
    return this.db.contactEmail.delete({
      where: { id },
    });
  }
}
