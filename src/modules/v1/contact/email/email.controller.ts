import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('/api/v1/contact/:contactId/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/')
  create(
    @Param('contactId') contactId: string,
    @Auth('uid') authUserId: string,
    @Body() createEmailDto: CreateEmailDto,
  ) {
    return this.emailService.create(contactId, createEmailDto, authUserId);
  }

  @Get('/')
  findAll(@Param('contactId') contactId: string) {
    return this.emailService.findAll(contactId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Auth('uid') authUserId: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.emailService.update(id, updateEmailDto, authUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(id);
  }
}
