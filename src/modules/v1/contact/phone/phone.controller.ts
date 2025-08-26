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
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { TenantGuard } from 'src/guards/tenant.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, TenantGuard)
@Controller('/api/v1/contact/:contactId/phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('/')
  create(
    @Param('contactId') contactId: string,
    @Auth('uid') authUserId: string,
    @Body() createPhoneDto: CreatePhoneDto,
  ) {
    return this.phoneService.create(contactId, createPhoneDto, authUserId);
  }

  @Get('/')
  findAll(@Param('contactId') contactId: string) {
    return this.phoneService.findAll(contactId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.phoneService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Auth('uid') authUserId: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.phoneService.update(id, updatePhoneDto, authUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneService.remove(id);
  }
}
