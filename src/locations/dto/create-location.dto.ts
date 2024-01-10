import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}
