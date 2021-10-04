import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class CreateStickyNoteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content: string;

  createdBy: number;
}
