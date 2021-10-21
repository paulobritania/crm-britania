import { ApiProperty } from '@nestjs/swagger'

export class ProductDto {
  @ApiProperty()
  productCode: string

  @ApiProperty()
  productDescription: string

  @ApiProperty()
  masterLineCode: number

  @ApiProperty()
  masterLineDescription: string

  @ApiProperty()
  lineCode: number

  @ApiProperty()
  lineDescription: string

  @ApiProperty()
  materialFamilyCode: string

  @ApiProperty()
  materialFamilyDescription: string

  @ApiProperty()
  commercialProductCode: string

  @ApiProperty()
  commercialProductDescription: string

  @ApiProperty()
  stockGroupCode: number

  @ApiProperty()
  stockGroupDescription: string

  @ApiProperty()
  outLine: boolean

  @ApiProperty()
  outLineImport: boolean

  @ApiProperty()
  criticalItem: boolean
}
