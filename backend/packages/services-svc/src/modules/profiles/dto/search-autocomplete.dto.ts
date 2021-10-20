import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString, Length } from 'class-validator'

export class SearchProfileAutocompleteDto {
  @IsString()
  @IsOptional()
  @Length(3, 25)
  @ApiProperty({ required: false })
  name: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  limit: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  offset: string;
}
