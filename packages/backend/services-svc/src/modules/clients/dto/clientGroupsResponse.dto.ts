/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

class ClientsGroupsDto {
  @ApiProperty()
  codigogrupocliente: number;

  @ApiProperty()
  nomegrupocliente: string;
}

export class ClientGroupsResponseDto {
  @ApiProperty()
  totalRegisters: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  dataExecucao: Date;

  @ApiProperty()
  gruposCliente: ClientsGroupsDto[];
}
