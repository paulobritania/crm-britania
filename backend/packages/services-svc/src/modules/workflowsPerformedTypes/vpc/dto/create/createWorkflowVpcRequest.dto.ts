import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateWorkflowVpcRequestDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  requestNumber: number

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  establishmentCode: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  establishmentName: string

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  value: number
}
