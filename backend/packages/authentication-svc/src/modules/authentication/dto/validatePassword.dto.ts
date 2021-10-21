import { ApiProperty } from '@nestjs/swagger'

export class ValidatePasswordDto {
  userId: string;

  @ApiProperty()
  password: string;
}
