/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { WorkflowVpc } from './workflowVpc.entity'

@Table({
  modelName: 'WorkflowVpcProduct',
  tableName: 'workflow_vpc_products',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowVpcProduct extends Model<WorkflowVpcProduct> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflowvpcproduct'
  })
  id: number

  @Column({
    type: DataType.STRING(15),
    allowNull: false
  })
  number: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantity: number

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  name: string

  @BelongsTo(() => WorkflowVpc, {
    foreignKey: 'workflowVpcId',
    targetKey: 'id'
  })
  vpc: WorkflowVpc
}
