import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

import { File } from '../../files/entities/file.entity'
// eslint-disable-next-line import/no-cycle
import { MessageBoard } from './messageBoard.entity'

@Table({
  modelName: 'messageBoardsFile',
  tableName: 'message_boards_files',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class MessageBoardsFile extends Model<MessageBoardsFile> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the message board record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  messageId: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  fileId: number;

  @HasOne(() => MessageBoard, { as: 'messageBoard', sourceKey: 'messageId', foreignKey: 'id' })
  messageBoard: MessageBoard

  @HasOne(() => File, { sourceKey: 'fileId', foreignKey: 'id' })
  file: File
}
