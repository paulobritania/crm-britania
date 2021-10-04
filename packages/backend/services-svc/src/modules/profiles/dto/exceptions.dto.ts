import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty } from 'class-validator'

const fieldIsRequired = { required: true }

export class ExceptionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  access: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  permission: number;

}
