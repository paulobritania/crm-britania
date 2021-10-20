import { ApiProperty } from '@nestjs/swagger'

export class ListWorkflowVersionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  version: string;
}
