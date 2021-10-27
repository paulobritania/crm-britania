import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript'

import { Profile } from '../../profiles/entities/profile.entity'
// eslint-disable-next-line import/no-cycle
import { MessageBoard } from './messageBoard.entity'

@Table({
  modelName: 'MessageProfilesAssoc',
  tableName: 'message_boards_profiles_assoc',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class MessageProfilesAssoc extends Model<MessageProfilesAssoc> {
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
  profileId: number;

  @HasMany(() => Profile, { sourceKey: 'profileId', foreignKey: 'id' })
  profile: Profile;

  @HasMany(() => MessageBoard, { as: 'messageBoard', sourceKey: 'messageId', foreignKey: 'id' })
  messageBoard: MessageBoard
}
