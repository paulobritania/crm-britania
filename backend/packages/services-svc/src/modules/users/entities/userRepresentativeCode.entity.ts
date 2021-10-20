import {
  Column,
  Model,
  Table,
  DataType,
  HasMany
} from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { Hierarchy } from '../../hierarchy/entities/hierarchy.entity'

@Table({
  modelName: 'UserRepresentativeCode',
  tableName: 'users_representative_codes',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'code'] // combination is unique
    }
  ]
})
export class UserRepresentativeCode extends Model<UserRepresentativeCode> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.INTEGER
  })
  userId: number

  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.STRING(50)
  })
  code: string

  @HasMany(() => Hierarchy, { as: 'hierarchies', sourceKey: 'code', foreignKey: 'memberCode' })
  hierarchies: Hierarchy[]
}
