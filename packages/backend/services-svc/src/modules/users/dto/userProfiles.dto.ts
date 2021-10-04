import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsNumber } from 'class-validator'

const fieldIsRequired = { required: true }

export class UpdateUserProfilesDto {
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({ ...fieldIsRequired, type: Number, isArray: true })
  profiles: number[]
}
