/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

class MasterLineDto {
  @ApiProperty()
  codigolinhapai: number;

  @ApiProperty()
  descricaolinhapai: string;
}

export class FindAllMasterLinesResponseDto {
  @ApiProperty()
  totalRegisters: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  dataExecucao: Date;

  @ApiProperty()
  linhaPai: MasterLineDto[];
}
