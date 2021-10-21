import { Injectable, Inject } from '@nestjs/common'

import { ClientsService } from '../clients/clients.service'
import { FindVpcContractualPercentageQueryDto } from './dtos/findVpcContractualPercentage/findVpcContractualPercentageQuery.dto'
import { VpcContractualPercentageDto } from './dtos/findVpcContractualPercentage/vpcContractualPercentage.dto'
import { FindVpcFundsControlQueryDto } from './dtos/findVpcFundsControl/findVpcFundsControlQuery.dto'
import {
  VpcFundsControlDto,
  VpcFundsControlResponseDto,
  VpcFundsControlTotalizerDto
} from './dtos/findVpcFundsControl/vpcFundsControl.dto'

@Injectable()
export class ReportsService {
  constructor(
    @Inject(ClientsService)
    private clientsService: ClientsService
  ) {}

  /**
   * Busca os dados para o relatório de percentuais de contrato de VPC
   * @param query FindVpcContractualPercentageQueryDto
   * @param authToken string
   */
  async findVpcContractualPercentage(
    query: FindVpcContractualPercentageQueryDto,
    authToken: string
  ): Promise<VpcContractualPercentageDto[]> {
    const data = await this.clientsService.findClientContractualPercentage(
      query.parentCompanyCodes,
      authToken
    )

    return data.map((contractualPercentage) => ({
      clientCode: contractualPercentage.codigoCliente,
      clientName: contractualPercentage.nomeCliente,
      budgetContractCode: contractualPercentage.codigoContratoVerba,
      budgetContractName: contractualPercentage.nomeContratoVerba,
      lineCode: contractualPercentage.codigoLinha,
      lineName: contractualPercentage.nomeLinha,
      periodicity: contractualPercentage.periodicidade,
      contractualPercentage: contractualPercentage.percentualContrato,
      contractType: contractualPercentage.tipoContrato,
      value: contractualPercentage.valor
    }))
  }

  /**
   * Busca os dados para o relatório de controle de verbas de VPC
   * @param query FindVpcFundsControlQueryDto
   * @returns Promise<VpcFundsControlResponseDto>
   */
  findVpcFundsControl(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: FindVpcFundsControlQueryDto
  ): Promise<VpcFundsControlResponseDto> {
    const items: VpcFundsControlDto[] = [
      {
        billing: 33194110.92,
        regional: 'Diretoria linha branca',
        credit: 71749.9,
        returnCancellation: 71749.9,
        moneyConsumed: 151804.57,
        inProgress: 66388221.84,
        newRequest: 66388221.84,
        balanceYear: 299414.9,
        percentageConsumed: 1.38,
        availableFunds: 151804.57,
        percentageNewRequest: 1.38,
        percentageTotalYear: 1.38,
        percentageInProgress: 1.38,
        children: [
          {
            billing: 16597055.46,
            regional: 'Maurício André',
            credit: 35874.95,
            returnCancellation: 35874.95,
            moneyConsumed: 151799.74,
            inProgress: 33194110.92,
            newRequest: 33194110.92,
            balanceYear: 182257,
            percentageConsumed: 0.72,
            availableFunds: 151799.74,
            percentageNewRequest: 0.72,
            percentageTotalYear: 0.72,
            percentageInProgress: 0.72,
            children: []
          },
          {
            billing: 16597055.46,
            regional: 'Gilmar de Oliveira',
            credit: 35874.95,
            returnCancellation: 35874.95,
            moneyConsumed: 4.83,
            inProgress: 33194110.92,
            newRequest: 33194110.92,
            balanceYear: 176325.52,
            percentageConsumed: 0,
            availableFunds: 4.83,
            percentageNewRequest: 0,
            percentageTotalYear: 0,
            percentageInProgress: 0,
            children: []
          },
          {
            billing: 0,
            regional: 'L. J Becker',
            credit: 0,
            returnCancellation: 0,
            moneyConsumed: 0,
            inProgress: 0,
            newRequest: 0,
            balanceYear: -59167.62,
            percentageConsumed: 0.66,
            availableFunds: 0,
            percentageNewRequest: 0.66,
            percentageTotalYear: 0.66,
            percentageInProgress: 0.66,
            children: []
          }
        ]
      },
      {
        billing: 3661028.9,
        regional: 'Luciana Ferreira',
        credit: 71749.9,
        returnCancellation: 71749.9,
        moneyConsumed: 0,
        inProgress: 3661028.9,
        newRequest: 3661028.9,
        balanceYear: -418000,
        percentageConsumed: 0,
        availableFunds: 0,
        percentageNewRequest: 0,
        percentageTotalYear: 0,
        percentageInProgress: 0,
        children: []
      },
      {
        billing: 0,
        regional: 'Marcelo Silva',
        credit: 0,
        returnCancellation: 0,
        moneyConsumed: 0,
        inProgress: 0,
        newRequest: 0,
        balanceYear: 89969.82,
        percentageConsumed: 1.58,
        availableFunds: 0,
        percentageNewRequest: 1.58,
        percentageTotalYear: 1.58,
        percentageInProgress: 1.58,
        children: []
      },
      {
        billing: 3661028.9,
        regional: 'Marcos Silva',
        credit: 71749.9,
        returnCancellation: 71749.9,
        moneyConsumed: 151799.74,
        inProgress: 3661028.9,
        newRequest: 3661028.9,
        balanceYear: -1359762.92,
        percentageConsumed: 39.76,
        availableFunds: 151799.74,
        percentageNewRequest: 39.76,
        percentageTotalYear: 39.76,
        percentageInProgress: 39.76,
        children: [
          {
            billing: 3661028.9,
            regional: 'Marcos Silva Jr',
            credit: 71749.9,
            returnCancellation: 71749.9,
            moneyConsumed: 151799.74,
            inProgress: 3661028.9,
            newRequest: 3661028.9,
            balanceYear: -1359762.92,
            percentageConsumed: 39.76,
            availableFunds: 151799.74,
            percentageNewRequest: 39.76,
            percentageTotalYear: 39.76,
            percentageInProgress: 39.76,
            children: []
          }
        ]
      }
    ]

    const response: VpcFundsControlResponseDto = {
      items,
      total: this.getVpcFundsControlTotalizer(items)
    }

    return Promise.resolve(response)
  }

  /**
   * Monta o totalizador do relatório de controle de verbas de VPC
   * @param items VpcFundsControlDto[]
   * @returns VpcFundsControlTotalizerDto
   */
  getVpcFundsControlTotalizer(
    items: VpcFundsControlDto[]
  ): VpcFundsControlTotalizerDto {
    const totalizer: VpcFundsControlTotalizerDto = {
      availableFunds: 0,
      balanceYear: 0,
      billing: 0,
      credit: 0,
      inProgress: 0,
      moneyConsumed: 0,
      newRequest: 0,
      percentageConsumed: 0,
      percentageInProgress: 0,
      percentageNewRequest: 0,
      percentageTotalYear: 0,
      returnCancellation: 0
    }

    Object.keys(totalizer).forEach((key) => {
      totalizer[key] = Number(
        items
          .map((val) => val[key])
          .reduce((a, b) => a + b, 0)
          .toFixed(2)
      )
    })

    return totalizer
  }
}
