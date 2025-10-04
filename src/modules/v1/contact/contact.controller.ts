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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Headers } from 'src/decorators/header.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { TenantGuard } from 'src/guards/tenant.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Contact')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'The Tenant ID',
  required: true,
})
@UseGuards(AuthGuard, TenantGuard)
@Controller('/api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({ status: 201, description: 'The contact has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(
    @Auth('uid') authUserId: string,
    @Headers('x-tenant-id') tenantId: string,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.create(tenantId, createContactDto, authUserId);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all contacts for a tenant' })
  @ApiResponse({ status: 200, description: 'A list of contacts.' })
  findAll(@Headers('x-tenant-id') tenantId: string) {
    return this.contactService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact by ID' })
  @ApiResponse({ status: 200, description: 'The contact details.' })
  @ApiResponse({ status: 404, description: 'Contact not found.' })
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contact' })
  @ApiResponse({ status: 200, description: 'The contact has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Contact not found.' })
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact' })
  @ApiResponse({ status: 200, description: 'The contact has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Contact not found.' })
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
