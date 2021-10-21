import { Column, Model, Table, DataType, HasOne, HasMany } from 'sequelize-typescript'

import { User } from '../../users/entities/user.entity'
// eslint-disable-next-line import/no-cycle
import { MessageProfilesAssoc } from './messageAssocProfiles.entity'
// eslint-disable-next-line import/no-cycle
import { MessageBoardsFile } from './messageBoardFile.entity'

@Table({
  modelName: 'MessageBoard',
  tableName: 'message_boards',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})
export class MessageBoard extends Model<MessageBoard> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the message board record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  title: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  content: string;

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  expirationDate: string;

  @Column({
    allowNull: true,
    type: DataType.CHAR(1)
  })
  homeScreen: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy: number;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  updatedAt: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number;

  @Column({
    type: DataType.DATE
  })
  createdAt: string;

  @HasOne(() => User, { sourceKey: 'updatedBy', foreignKey: 'id' })
  user: User;

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  userId: User;

  @HasMany(() => MessageProfilesAssoc, { as: 'messageProfile', sourceKey: 'id', foreignKey: 'messageId' })
  messageProfile: MessageProfilesAssoc

  @HasMany(() => MessageBoardsFile, { sourceKey: 'id', foreignKey: 'messageId' })
  files: MessageBoardsFile
}
