import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTenantDto) {
    const data: Prisma.TenantCreateInput = {
      name: dto.name,
      email: dto.email
    };
    return this.prisma.tenant.create({ data });
  }

  findAll() {
    return this.prisma.tenant.findMany({
      include: {
        properties: true,
        contracts: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.tenant.findUnique({
      where: { id },
      include: {
        properties: true,
        contracts: true
      }
    });
  }

  update(id: number, data: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.tenant.delete({ where: { id } });
  }

  async assignProperty(tenantId: number, propertyId: number) {
    // Verify if the tenant exists
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId }
    });
    if (!tenant) throw new Error('Tenant not found');

    // Verify if the property exists
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId }
    });
    if (!property) throw new Error('Property not found');

    // Update the property to assign the tenant
    return this.prisma.property.update({
      where: { id: propertyId },
      data: { tenantId }
    });
  }
}
