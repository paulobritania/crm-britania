import { Column, Model, Table, DataType, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { File } from '../../files/entities/file.entity'
// eslint-disable-next-line import/no-cycle
import { Profile } from '../../profiles/entities/profile.entity'
// eslint-disable-next-line import/no-cycle
import { UserProfile } from './userProfile.entity'
import { UserRepresentativeCode } from './userRepresentativeCode.entity'

@Table({
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  indexes: [{
    unique: true,
    fields: ['username']
  }]
})
export class User extends Model<User> { 
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the users record'
  })
  id: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  imageId: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(50)
  })
  username: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(60)
  })
  email: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50)
  })
  phone: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  customerHierarchyEnabled: boolean;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  substituteUserId: number;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  substituteUserStartDate: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  substituteUserEndDate: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  isActive: boolean;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  createdBy: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy: number;

  @HasMany(() => UserRepresentativeCode, { as: 'representativeCodes', sourceKey: 'id', foreignKey: 'userId' })
  representativeCodes: UserRepresentativeCode[];

  @BelongsToMany(() => Profile, { through: 'userProfiles', as: 'userProfile', sourceKey: 'id', foreignKey: 'userId', otherKey: 'profileId' })
  userProfile: Profile;

  @HasOne(() => File, { sourceKey: 'imageId', foreignKey: 'id' })
  file: File;

  @HasOne(() => User, { sourceKey: 'substituteUserId', foreignKey: 'id' })
  substituteUser: User;

  @HasMany(() => UserProfile, { as: 'userProfiles', sourceKey: 'id', foreignKey: 'userId' })
  userProfiles: UserProfile[];
}
