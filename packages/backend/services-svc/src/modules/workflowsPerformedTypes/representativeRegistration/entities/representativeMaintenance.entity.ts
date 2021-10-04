import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'RepresentativeMaintenance',
  tableName: 'representative_maintenance',
  underscored: true,
  version: false,
  timestamps: false
})
export class RepresentativeMaintenance extends Model<RepresentativeMaintenance> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the representative maintenance record'
  })
  id: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  representativeType: number

  @Column({
    allowNull: true,
    type: DataType.STRING(10)
  })
  personType: string

  @Column({
    allowNull: true,
    type: DataType.STRING(20)
  })
  country: string

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  representativeGroupCode: number

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  representativeGroupName: string

  @Column({
    allowNull: true,
    type: DataType.STRING(6)
  })
  paymentCalendar: string

  @Column({
    allowNull: true,
    type: DataType.STRING(12)
  })
  formula: string

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN
  })
  intermediator: boolean

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  generationAdCarrier: number

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(8, 3)
  })
  commissionPercentage: number

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(8, 3)
  })
  commissionEmissionPercentage: number

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(8, 3)
  })
  minimumCommissionPercentage: number

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(8, 3)
  })
  maximumCommissionPercentage: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  manualCommission: number
}
