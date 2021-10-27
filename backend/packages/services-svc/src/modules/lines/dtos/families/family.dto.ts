/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

export class FamilyDto {
  @ApiProperty()
  familyCode: string;

  @ApiProperty()
  familyDescription: string;
}
