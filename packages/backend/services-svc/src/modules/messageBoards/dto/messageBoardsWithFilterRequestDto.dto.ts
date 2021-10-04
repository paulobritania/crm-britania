import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class MessageBoardsWithFilterRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  profiles?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  expirationDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  limit?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  offset?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  orderBy?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;
}
