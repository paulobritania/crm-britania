import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { ClientRankingIndicator } from '../../../clientRankings/entities/clientRankingIndicator.entity'
import { Ranking } from '../../../clientRankings/entities/ranking.entity'
import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'

@Table({
  modelName: 'WorkflowClientRanking',
  tableName: 'workflow_client_rankings',
  underscored: true,
  version: false,
  timestamps: false
})
export class WorkflowClientRanking extends Model<WorkflowClientRanking> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow ranking record'
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
  rankingId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowPerformedId: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  clientRankingIndicatorId: number

  @Column({
    allowNull: false,
    type: DataType.STRING(100)
  })
  justification: string

  @HasOne(() => Ranking, { sourceKey: 'rankingId', foreignKey: 'id' })
  ranking: Ranking

  @HasOne(() => WorkflowPerformed, {
    sourceKey: 'workflowPerformedId',
    foreignKey: 'id'
  })
  workflowPerformed: WorkflowPerformed

  @HasOne(() => ClientRankingIndicator, {
    sourceKey: 'clientRankingIndicatorId',
    foreignKey: 'id'
  })
  clientRankingIndicator: ClientRankingIndicator
}
