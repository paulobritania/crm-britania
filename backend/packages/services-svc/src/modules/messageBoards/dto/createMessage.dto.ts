import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateMessageDto {
  @ApiProperty({ required: true })
  @MaxLength(4000)
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @MaxLength(4000)
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ required: true })
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

  createdBy: number;
}

