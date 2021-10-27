import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
import { ClientRegistrationInformation } from './clientRegistrationInformation.entity'

@Table({
  modelName: 'WorkflowRegisterClientPerformed',
  tableName: 'workflow_register_client_performed',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowRegisterClientPerformed extends Model<WorkflowRegisterClientPerformed> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientPriceList'
  })
  id: number

  @BelongsTo(() => ClientRegistrationInformation, {
    foreignKey: 'workflowRegisterClientId',
    targetKey: 'id'
  })
  clientRegister: ClientRegistrationInformation

  @BelongsTo(() => WorkflowPerformed, {
    foreignKey: 'workflowPerformedId',
    targetKey: 'id'
  })
  workflowPerformed: WorkflowPerformed
}
