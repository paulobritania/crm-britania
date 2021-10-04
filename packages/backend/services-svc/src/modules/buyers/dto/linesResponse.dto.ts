/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

class LinesDto {
  @ApiProperty()
  codigolinha: number;

  @ApiProperty()
  descricaolinha: string;
}

export class LinesResponseDto {
  @ApiProperty()
  totalRegisters: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  dataExecucao: Date;

  @ApiProperty()
  linha: LinesDto[];
}
