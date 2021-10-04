import { ApiProperty } from '@nestjs/swagger'

export class EstablishmentsDto {
  @ApiProperty()
  establishmentCode: string;

  @ApiProperty()
  establishmentDescription: string;
}
