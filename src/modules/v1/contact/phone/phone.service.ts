import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PhoneService {
  constructor(private db: DatabaseService) {}

  create(contactId: string, data: CreatePhoneDto, authUserId: string) {
    return this.db.contactPhone.create({
      data: {
        contactId,
        ...data,
        createdBy: authUserId,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Fetch all phone numbers for a contact.
   */
  findAll(contactId: string) {
    return this.db.contactPhone.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Fetch a single phone number by ID.
   */
  findOne(id: string) {
    return this.db.contactPhone.findUnique({
      where: { id },
    });
  }

  /**
   * Update a phone number.
   */
  update(id: string, data: UpdatePhoneDto, authUserId: string) {
    return this.db.contactPhone.update({
      where: { id },
      data: {
        ...data,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Remove a phone number.
   */
  remove(id: string) {
    return this.db.contactPhone.delete({
      where: { id },
    });
  }
}
