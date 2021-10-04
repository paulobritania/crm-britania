import { ApiProperty } from '@nestjs/swagger'

export class ClientGroupsDto {
  @ApiProperty()
  nameClientGroup: string;

  @ApiProperty()
  codeClientGroup: number;
}
