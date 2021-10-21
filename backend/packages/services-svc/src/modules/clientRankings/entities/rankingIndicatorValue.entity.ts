import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { User } from '../../users/entities/user.entity'
import { Ranking } from './ranking.entity'
import { RankingIndicator } from './rankingIndicator.entity'

@Table({
  modelName: 'RankingIndicatorValue',
  tableName: 'ranking_indicator_values',
  underscored: true,
  version: false,
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['ranking_id', 'ranking_indicator_id']
    }
  ]
})
export class RankingIndicatorValue extends Model<RankingIndicatorValue> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ranking record'
  })
  rankingId: number

  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ranking indicator record'
  })
  rankingIndicatorId: number

  @Column({
    allowNull: false,
    type: DataType.STRING(2)
  })
  symbol: string

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(8, 3)
  })
  goal: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  weight: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  updatedBy: number

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  updatedAt: string

  @HasOne(() => Ranking, { sourceKey: 'rankingId', foreignKey: 'id' })
  ranking: Ranking

  @HasOne(() => RankingIndicator, {
    sourceKey: 'rankingIndicatorId',
    foreignKey: 'id'
  })
  rankingIndicator: RankingIndicator

  @HasOne(() => User, { sourceKey: 'updatedBy', foreignKey: 'id' })
  user: User
}
