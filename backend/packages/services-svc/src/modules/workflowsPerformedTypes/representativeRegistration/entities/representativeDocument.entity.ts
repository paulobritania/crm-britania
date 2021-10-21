/* eslint-disable import/no-cycle */
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { File } from '../../../files/entities/file.entity'
import { WorkflowRepresentativeRegistration } from './workflowRepresentativeRegistration.entity'


@Table({
  modelName: 'RepresentativeDocument',
  tableName: 'representative_document',
  underscored: true,
  version: false,
  timestamps: false
})
export class RepresentativeDocument extends Model<RepresentativeDocument> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the representative document record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowRepresentativeRegistrationId: number

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  name: string

  @Column({
    allowNull: true,
    type: DataType.STRING(50)
  })
  observation: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  fileId: number

  @HasOne(() => WorkflowRepresentativeRegistration, {
    sourceKey: 'workflowRepresentativeRegistrationId',
    foreignKey: 'id'
  })
  workflowRepresentativeRegistration: WorkflowRepresentativeRegistration

  @HasOne(() => File, {
    sourceKey: 'fileId',
    foreignKey: 'id'
  })
  file: File
}
