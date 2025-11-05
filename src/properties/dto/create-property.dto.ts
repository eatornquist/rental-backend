import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNumber()
  rent: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tenantId?: number;
}
