import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'Ranking',
  tableName: 'rankings',
  underscored: true,
  version: false,
  timestamps: false
})
export class Ranking extends Model<Ranking> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the ranking record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(30)
  })
  description: string

  @Column({
    allowNull: false,
    type: DataType.STRING(30)
  })
  alias: string
}
