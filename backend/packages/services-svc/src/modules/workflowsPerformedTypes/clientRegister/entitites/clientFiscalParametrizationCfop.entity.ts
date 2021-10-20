import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'ClientFiscalParametrizationCfop',
  tableName: 'client_fiscal_parametrization_cfop',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientFiscalParametrizationCfop extends Model<ClientFiscalParametrizationCfop> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientFiscalParametrizationCfop'
  })
  id: number

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalStVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  nationalStVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedStVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  importedStVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTvVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausNotebookVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMicrowaveVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMinisystemVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausArconVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausMonitorVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausSmartVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausTabletVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausDesktopVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausFreeManausCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausFreeManausDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausAgScTvCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manausAgScTvDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTvCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTvDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTvStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTvStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTvVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTvVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScTvVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScTvVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScNotebookCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScNotebookDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScNotebookStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScNotebookStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScNotebookVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScNotebookVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScNotebookVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agcScNotebookVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMicrowavesVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMinisystemVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScArconVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMonitorCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMonitorDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMonitorStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMonitorStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScVpcMonitorCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScVpcMonitorDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMonitorVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScMonitorVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScSmartVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScTableVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopVpcCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopVpcDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agScDesktopVpcStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpTvCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpTvDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpTvStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpTvStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMicrowavesCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMicrowavesDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMicrowavesStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMicrowavesStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpArconCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpArconDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpArconStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpArconStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMonitorCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMonitorDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMonitorStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  agSpMonitorStDescription: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedVpcStCode: string

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  manufacturedVpcStDescription: string
}
