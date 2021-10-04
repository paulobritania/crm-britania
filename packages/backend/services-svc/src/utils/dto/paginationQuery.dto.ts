import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

export class PaginationQueryDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  limit: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  offset: number;
}
