import { ApiProperty } from '@nestjs/swagger'

export class UserAutocompleteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
