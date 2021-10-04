import { ApiProperty } from '@nestjs/swagger'

const notRequired = { required: false }

export class ClientGroupsQueryDto {
  @ApiProperty(notRequired)
  nameClientGroup: string;

  @ApiProperty(notRequired)
  codeClientGroup: string;

  @ApiProperty(notRequired)
  sort: string;

  @ApiProperty(notRequired)
  page: number;

  @ApiProperty(notRequired)
  pageSize: number;
}