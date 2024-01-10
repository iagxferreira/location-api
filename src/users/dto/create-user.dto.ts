import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
}
