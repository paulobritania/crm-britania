import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { File } from '../../files/entities/file.entity'
import { User } from '../../users/entities/user.entity'

@Table({
  modelName: 'Document',
  tableName: 'documents',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Document extends Model<Document> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the Documents record'
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(70)
  })
  title: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(4000)
  })
  observation: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  alias: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  fileId: number

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

  @HasOne(() => File, { sourceKey: 'fileId', foreignKey: 'id' })
  file: File;

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  createdByUser: User;

  @HasOne(() => User, { sourceKey: 'updatedBy', foreignKey: 'id' })
  updatedByUser: User;
}
