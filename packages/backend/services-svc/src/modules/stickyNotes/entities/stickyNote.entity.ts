import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  modelName: 'stickyNote',
  tableName: 'sticky_notes',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})
export class StickyNote extends Model<StickyNote> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the sticky notes record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(4000)
  })
  content: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy: number;
}
