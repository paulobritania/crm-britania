/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { File } from '../../../files/entities/file.entity'
import { ClientDocument } from './clientDocument.entity'

@Table({
  modelName: 'ClientDocumentBalance',
  tableName: 'client_document_balance',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientDocumentBalance extends Model<ClientDocumentBalance> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientDocumentBalance'
  })
  id: number

  @BelongsTo(() => File, {
    foreignKey: 'fileId',
    targetKey: 'id'
  })
  file: File

  fileId: number

  @BelongsTo(() => ClientDocument, {
    foreignKey: 'clientDocumentId',
    targetKey: 'id'
  })
  document: ClientDocument
}
