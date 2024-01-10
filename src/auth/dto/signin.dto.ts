import { ApiProperty } from '@nestjs/swagger';

export class SigninDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
