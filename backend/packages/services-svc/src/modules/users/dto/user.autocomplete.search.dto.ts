import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UserAutocompleteSearchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;
}
