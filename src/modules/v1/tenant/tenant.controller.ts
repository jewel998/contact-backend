import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('/api/v1/tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/')
  create(
    @Auth('uid') authUserId: string,
    @Body() createTenantDto: CreateTenantDto,
  ) {
    return this.tenantService.create(createTenantDto, authUserId);
  }

  @Get('/')
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Auth('uid') authUserId: string,
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return this.tenantService.update(id, updateTenantDto, authUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
