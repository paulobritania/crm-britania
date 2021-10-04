/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

class FamiliesDto {
  @ApiProperty()
  codigofamiliamaterial: string;

  @ApiProperty()
  descricaofamiliamaterial: string;
}

export class FamiliesResponseDto {
  @ApiProperty()
  totalRegisters: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  dataExecucao: Date;

  @ApiProperty()
  familiaMaterial: FamiliesDto[];
}
