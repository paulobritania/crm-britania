import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

const isOptional = { required: false }

export class FindAllDocumentsDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty(isOptional)
  limit: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty(isOptional)
  offset: string;
}
