import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'RepresentativeBankData',
  tableName: 'representative_bank_data',
  underscored: true,
  version: false,
  timestamps: false
})
export class RepresentativeBankData extends Model<RepresentativeBankData> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the representative bank data record'
  })
  id: number

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  name: string

  @Column({
    allowNull: true,
    type: DataType.STRING(4)
  })
  code: string

  @Column({
    allowNull: true,
    type: DataType.STRING(7)
  })
  agency: string

  @Column({
    allowNull: true,
    type: DataType.STRING(20)
  })
  account: string

}
