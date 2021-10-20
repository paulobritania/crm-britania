import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNumberString,
  IsOptional,
  IsString,
  Validate
} from 'class-validator'

import { IsArrayOfTwoNumbersJoinedInString } from '../../../utils/validations/isArrayOfTwoNumbersJoinedInStringValidator'

const notRequired = { required: false }
export class GetClientHierarchyRepresentativesQueryDto {
  @IsNumberString({}, { each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({ isArray: true, type: Number, ...notRequired })
  lineCodes: number[]

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  @Validate(IsArrayOfTwoNumbersJoinedInString)
  @ApiProperty({
    isArray: true,
    type: String,
    ...notRequired,
    description:
      'List of lines (right) and families (left) joined by comma. Ex: [\'1,16000\', \'1,15000\']'
  })
  linesAndFamilies: string[]
}
