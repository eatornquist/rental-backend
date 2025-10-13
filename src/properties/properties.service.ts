import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePropertyDto) {
    const data: Prisma.PropertyCreateInput = {
      address: dto.address,
      rent: dto.rent,
      tenant: dto.tenantId ? { connect: { id: dto.tenantId } } : undefined
    };
    return this.prisma.property.create({ data });
  }

  async findAll() {
    return this.prisma.property.findMany({
      include: { tenant: true, contracts: true },
      orderBy: { id: 'asc' }
    });
  }

  async findOne(id: number) {
    return this.prisma.property.findUnique({
      where: { id },
      include: { tenant: true, contracts: true }
    });
  }

  update(id: number, dto: UpdatePropertyDto) {
    const data: Prisma.PropertyUpdateInput = {
      address: dto.address,
      rent: dto.rent,
      tenant: dto.tenantId ? { connect: { id: dto.tenantId } } : undefined
    };
    return this.prisma.property.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.property.delete({ where: { id } });
  }
}
