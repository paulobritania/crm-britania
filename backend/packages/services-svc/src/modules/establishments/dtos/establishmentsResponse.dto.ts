/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

class EstablishmentsDto {
  @ApiProperty()
  codigoempresa: string;

  @ApiProperty()
  nomeempresa: string;
}

export class EstablishmentsResponseDto {
  @ApiProperty()
  totalRegisters: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  dataExecucao: Date;

  @ApiProperty()
  empresas: EstablishmentsDto[];
}
