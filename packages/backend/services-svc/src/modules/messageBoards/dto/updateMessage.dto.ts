import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength, IsIn, IsNotEmpty } from 'class-validator'

export class UpdateMessageDto {
  @ApiProperty({ required: false })
  @MaxLength(4000)
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @MaxLength(4000)
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  expirationDate: string;

  @ApiProperty({ required: false })
  @IsIn(['0', '1'])
  @IsOptional()
  @IsString()
  homeScreen: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  profiles: string;

  files: Express.Multer.File[];
}

