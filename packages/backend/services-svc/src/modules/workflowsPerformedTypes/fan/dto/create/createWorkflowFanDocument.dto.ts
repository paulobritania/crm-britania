// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
  IsArray
} from 'class-validator'

const required = { required: true }

export class FanDocumentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ ...required })
  fileId: number

  @IsString()
  @IsOptional()
  @ApiProperty({ ...required })
  filename?: string
}

export class CreateWorkflowFanDocumentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FanDocumentDto)
  @ApiProperty({
    required: false,
    type: FanDocumentDto,
    isArray: true
  })
  documents: FanDocumentDto[]
}
