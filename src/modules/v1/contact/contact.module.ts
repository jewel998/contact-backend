import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { NoteModule } from './note/note.module';
import { EmailModule } from './email/email.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [NoteModule, EmailModule, PhoneModule],
})
export class ContactModule {}
