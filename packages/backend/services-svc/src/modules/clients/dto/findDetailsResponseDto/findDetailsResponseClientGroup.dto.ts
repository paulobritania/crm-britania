import { ApiProperty } from '@nestjs/swagger'

export class FindDetailsResponseClientGroupDto {
  @ApiProperty()
  codigoGrupoCliente: number

  @ApiProperty()
  nomeGrupoCliente: string
}