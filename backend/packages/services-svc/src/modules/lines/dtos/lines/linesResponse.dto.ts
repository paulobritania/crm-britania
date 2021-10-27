/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

class Lines {
  @ApiProperty()
  codigolinha: number;

  @ApiProperty()
  descricaolinha: string;
}

export class FindAllLinesResponseDto {
  @ApiProperty()
  totalRegisters: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  dataExecucao: Date;

  @ApiProperty()
  linha: Lines[];
}
