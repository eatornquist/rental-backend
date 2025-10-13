import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
