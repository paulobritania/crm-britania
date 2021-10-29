import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  modelName: 'log',
  tableName: 'logs',
  underscored: true,
  version: false,
  timestamps: false
})
export class Log extends Model<Log> {
  // @Column({
  //   primaryKey: true,
  //   allowNull: false,
  //   autoIncrement: true,
  //   type: DataType.INTEGER,
  //   comment: 'The identifier for the logs record'
  // })
  // id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  userId: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    get(this: Log) {
      const data = this.getDataValue('newData')
      return data ? JSON.parse(data) : null
    },
    set(this: Log, value) {
      const data = value ? JSON.stringify(value) : null
      this.setDataValue('newData', data)
    }
  })
  newData: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    get(this: Log) {
      const data = this.getDataValue('oldData')
      return data ? JSON.parse(data) : null
    },
    set(this: Log, value) {
      const data = value ? JSON.stringify(value) : null
      this.setDataValue('oldData', data)
    }
  })
  oldData: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  table: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  httpVerb: string;
}




