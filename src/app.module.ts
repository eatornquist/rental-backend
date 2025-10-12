import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { PrismaService } from './prisma/prisma.service';
import { TenantsModule } from './tenants/tenants.module';
import { ContractsModule } from './contracts/contracts.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PropertiesModule, TenantsModule, ContractsModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
