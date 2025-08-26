import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Headers } from 'src/decorators/header.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { TenantGuard } from 'src/guards/tenant.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, TenantGuard)
@Controller('/api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/')
  create(
    @Auth('uid') authUserId: string,
    @Headers('x-tenant-id') tenantId: string,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.create(tenantId, createContactDto, authUserId);
  }

  @Get('/')
  findAll(@Headers('x-tenant-id') tenantId: string) {
    return this.contactService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
