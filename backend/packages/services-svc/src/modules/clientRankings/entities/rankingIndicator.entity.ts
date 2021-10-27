import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  modelName: 'RankingIndicator',
  tableName: 'ranking_indicators',
  underscored: true,
  version: false,
  timestamps: false
})
export class RankingIndicator extends Model<RankingIndicator> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the ranking indicator record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(50)
  })
  description: string

  @Column({
    allowNull: false,
    type: DataType.STRING(30)
  })
  alias: string
}
