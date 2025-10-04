import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class TenantService {
  constructor(private db: DatabaseService) {}

  /**
   * Create a new tenant.
   */
  create(data: CreateTenantDto, authUserId: string) {
    return this.db.tenant.create({
      data: {
        ...data,
        createdBy: authUserId,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Fetch all tenants.
   */
  findAll() {
    return this.db.tenant.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Fetch a single tenant by ID.
   */
  findOne(id: string) {
    return this.db.tenant.findUnique({
      where: { id },
    });
  }

  /**
   * Update a tenant.
   */
  update(id: string, data: UpdateTenantDto, authUserId: string) {
    return this.db.tenant.update({
      where: { id },
      data: {
        ...data,
        updatedBy: authUserId,
      },
    });
  }

  /**
   * Remove a tenant.
   */
  remove(id: string) {
    return this.db.tenant.delete({
      where: { id },
    });
  }
}
