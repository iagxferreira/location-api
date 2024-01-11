import { ApiProperty } from '@nestjs/swagger';

export class FindLocationDto {
  @ApiProperty()
  take?: number;

  @ApiProperty()
  skip?: number;

  @ApiProperty()
  name?: string;
}
