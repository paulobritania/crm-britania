import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { WorkflowClientRanking } from '../../workflowsPerformedTypes/clientRankings/entities/workflowClientRanking.entity'
import { ClientRankingIndicator } from './clientRankingIndicator.entity'
import { Ranking } from './ranking.entity'

@Table({
  modelName: 'ClientRanking',
  tableName: 'client_rankings',
  underscored: true,
  version: false,
  timestamps: false
})
export class ClientRanking extends Model<ClientRanking> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the client ranking record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  clientTotvsCode: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  rankingId: boolean

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  workflowClientRankingId: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  clientRankingIndicatorId: number

  @HasOne(() => Ranking, { sourceKey: 'rankingId', foreignKey: 'id' })
  ranking: Ranking

  @HasOne(() => ClientRankingIndicator, {
    sourceKey: 'clientRankingIndicatorId',
    foreignKey: 'id'
  })
  clientRankingIndicator: ClientRankingIndicator

  @HasOne(() => WorkflowClientRanking, {
    sourceKey: 'workflowClientRankingId',
    foreignKey: 'id'
  })
  workflowClientRanking: WorkflowClientRanking
}
