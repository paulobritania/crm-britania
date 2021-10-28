import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

const notRequired = { required: false }

export class FindAllLogsQueryDto {

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  table: string;

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  log: string;

}
