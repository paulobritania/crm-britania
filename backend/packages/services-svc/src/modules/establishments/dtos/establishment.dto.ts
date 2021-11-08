import { ApiProperty } from '@nestjs/swagger'

export class EstablishmentDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  addressComplete: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  complement: string;
}
