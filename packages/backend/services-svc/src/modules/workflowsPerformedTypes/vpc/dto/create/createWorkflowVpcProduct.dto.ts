import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateWorkflowProductDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  number: number

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  quantity: number

  @IsOptional()
  @ApiProperty()
  @IsString()
  name: string
}
