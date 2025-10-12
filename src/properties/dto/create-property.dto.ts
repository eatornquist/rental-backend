import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  address: string;

  @IsNumber()
  rent: number;

  @IsOptional()
  @IsNumber()
  tenantId?: number;
}
