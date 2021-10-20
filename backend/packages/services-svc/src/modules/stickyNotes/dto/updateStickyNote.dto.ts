import { ApiProperty } from '@nestjs/swagger'
import { Length, IsString, IsOptional } from 'class-validator'

export class UpdateStickyNoteDto {
  @ApiProperty({ required: false })
  @Length(2, 4000)
  @IsOptional()
  @IsString()
  content: string;
}