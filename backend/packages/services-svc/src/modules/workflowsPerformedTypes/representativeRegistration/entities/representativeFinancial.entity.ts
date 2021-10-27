import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'RepresentativeFinancial',
  tableName: 'representative_financial',
  underscored: true,
  version: false,
  timestamps: false
})
export class RepresentativeFinancial extends Model<RepresentativeFinancial> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the representative financial record'
  })
  id: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  clientGroupCode: number

  @Column({
    allowNull: true,
    type: DataType.STRING(100)
  })
  clientGroupDescription: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  shortName: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  matrix: string

  @Column({
    allowNull: true,
    type: DataType.TEXT
  })
  historic: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  carrier: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  bankInstructions: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  standardIncomeInstructions: string

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  receivesNfe: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  issueBankSlip: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  generatesDebitNotice: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  calculatesFine: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  receivesSciInformation: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  simpleClient: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  icmsTaxpayer: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  buysPhilco: boolean

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  fullNonCumulative: boolean

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  expirationDate: string
}
