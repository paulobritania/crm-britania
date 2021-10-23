// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from "@nestjs/swagger";

// class BuyerLines {
//   @ApiProperty()
//   lineDescription: string;

//   @ApiProperty()
//   lineCode: number;
// }

export class FindAllBuyerReturnDto {
  @ApiProperty()
  clientTotvsCode: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  lineCodes: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  voltage: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  telephone: string;
  @ApiProperty()
  responsibleCode: number;
  @ApiProperty()
  responsibleDescription: string;
  @ApiProperty()
  imageId: number;
  @ApiProperty()
  offset: string;
  @ApiProperty()
  limit: string;
}
