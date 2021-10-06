/* eslint-disable import/no-cycle */
import {
  Column,
  Model,
  Table,
  DataType,
  HasOne
} from 'sequelize-typescript'

import { Profile } from '../../profiles/entities/profile.entity'
import { User } from './user.entity'

@Table({
  modelName: 'UserProfile',
  tableName: 'users_profiles',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})
export class UserProfile extends Model<UserProfile> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the user record'
  })
  userId: number

  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the profile record'
  })
  profileId: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  createdBy: number

  @HasOne(() => User, { sourceKey: 'userId', foreignKey: 'id' })
  user: User;

  @HasOne(() => Profile, { sourceKey: 'profileId', foreignKey: 'id' })
  profile: Profile;
}
