import { ApiProperty } from '@nestjs/swagger'

export class FindDetailsResponseAddressDto {
  @ApiProperty()
  endereco: string

  @ApiProperty()
  bairro: string

  @ApiProperty()
  cep: string

  @ApiProperty()
  cidade: string

  @ApiProperty()
  estado: string

  @ApiProperty()
  pais: string

  @ApiProperty()
  numero: string
}