/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

export class LinesReturnDto {
  @ApiProperty()
  lineCode: number;

  @ApiProperty()
  lineDescription: string;
}
