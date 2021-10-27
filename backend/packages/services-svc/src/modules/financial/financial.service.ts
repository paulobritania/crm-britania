/* eslint-disable no-param-reassign */
import { Response, Injectable } from '@nestjs/common'
import officegen from 'officegen'

import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { FindFinancialSecuritiesDto } from './dtos/findFinancialSecurities.dto'
import { FindFinancialSecuritiesQueryDto } from './dtos/findFinancialSecuritiesQuery.dto'
import { AnalyticalReportDto } from './dtos/getFinancialSecuritiesReport/analyticalReport.dto'
import { GetFinancialSecuritiesReportQueryDto } from './dtos/getFinancialSecuritiesReport/getFinancialSecuritiesReportQuery.dto'
import { SyntheticReportDto } from './dtos/getFinancialSecuritiesReport/syntheticReport.dto'

@Injectable()
export class FinancialService {
  // eslint-disable-next-line no-useless-constructor
  // constructor() {}

  /**
   * Lista todas os títulos financeiros
   * @param query FindFinancialSecuritiesQueryDto
   * @returns PagedResult<FindFinancialSecuritiesDto>
   */
  async findFinancialSecurities(
    //  TODO: Remover quando houver API da britânia
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: FindFinancialSecuritiesQueryDto
  ): Promise<PagedResult<FindFinancialSecuritiesDto>> {
    const data: FindFinancialSecuritiesDto[] = [
      {
        id: 1,
        establishment: 'Teste 1',
        customerCode: '0123456789',
        customerName: 'Cliente teste 1',
        nfTitle: '0123456789',
        nfValue: 'R$100,00',
        dueDate: new Date().toISOString(),
        installment: 5,
        totalAmountBankSlip: 'R$100,00',
        totalAmountInstallment: 'R$100,00',
        balance: 'R$0,00'
      },
      {
        id: 2,
        establishment: 'Teste 2',
        customerCode: '9876543210',
        customerName: 'Cliente teste 2',
        nfTitle: '9876543210',
        nfValue: 'R$100,00',
        dueDate: new Date().toISOString(),
        installment: 3,
        totalAmountBankSlip: 'R$100,00',
        totalAmountInstallment: 'R$100,00',
        balance: 'R$0,00'
      }
    ]

    return Promise.resolve(
      new PagedResult<FindFinancialSecuritiesDto>(2, data)
    )
  }

  async generateSintheticReport(itens: SyntheticReportDto[], res: Response): Promise<void> {
    const xlsx = officegen('xlsx')
    const sheet = xlsx.makeNewSheet()

    sheet.name = 'Visão Sintética'
    sheet.data[0] = []
    sheet.data[0][0] = 'Representante'
    sheet.data[0][1] = 'Cod Cliente'
    sheet.data[0][2] = 'Cliente Matriz'
    sheet.data[0][3] = 'Razão Social'
    sheet.data[0][4] = 'Estab.'
    sheet.data[0][5] = 'NF'
    sheet.data[0][6] = 'Valor NF'
    sheet.data[0][7] = 'Data de Faturamento'
    sheet.data[0][8] = 'Data Entrega'
    sheet.data[0][9] = 'Prazo'
    sheet.data[0][10] = 'Vencimento Duplicata'
    sheet.data[0][11] = 'Status Pagamento'
    sheet.data[0][12] = 'Observação Financeiro'

    itens.forEach((item, i) => {
      i += 1
      sheet.data[i] = []
      Object.values(item).forEach((value, x) => {
        sheet.data[i][x] = value
      })
    })

    await xlsx.generate(res)
  }

  async generateAnalyticalReport(itens: AnalyticalReportDto[], res: Response): Promise<void> {
    const xlsx = officegen('xlsx')
    const sheet = xlsx.makeNewSheet()

    sheet.name = 'Visão Analítica'
    sheet.data[0] = []
    sheet.data[0][0] = 'Representante'
    sheet.data[0][1] = 'Cod Cliente'
    sheet.data[0][2] = 'Cliente Matriz'
    sheet.data[0][3] = 'Razão Social'
    sheet.data[0][4] = 'Estab.'
    sheet.data[0][5] = 'NF'
    sheet.data[0][6] = 'Valor NF'
    sheet.data[0][7] = 'Data de Faturamento'
    sheet.data[0][8] = 'Data Entrega'
    sheet.data[0][9] = 'Prazo'
    sheet.data[0][10] = 'Vencimento Duplicata'
    sheet.data[0][11] = 'Parcela'
    sheet.data[0][12] = 'Valor da Parcela'
    sheet.data[0][13] = 'Saldo da Parcela'
    sheet.data[0][14] = 'Status Pagamento'
    sheet.data[0][15] = 'Observação Financeiro'

    itens.forEach((item, i) => {
      i += 1
      sheet.data[i] = []
      Object.values(item).forEach((value, x) => {
        sheet.data[i][x] = value
      })
    })

    await xlsx.generate(res)
  }

  async generateFinancialSecuritiesReport(
    query: GetFinancialSecuritiesReportQueryDto,
    res: Response
  ): Promise<void> {
    if (query.type === 'SYNTHETIC') {
      const syntheticDataMock: SyntheticReportDto[] = [
        {
          representative: 'Representante teste 1',
          customerCode: '0123456789',
          customerName: 'Cliente teste 1',
          socialReason: 'Razão social teste 1',
          establishment: 'Teste 1',
          nfTitle: '0123456789',
          nfValue: 'R$100,00',
          dueDate: new Date().toISOString(),
          deliveryDate: new Date().toISOString(),
          deadline: 5,
          duplicateExpiration: new Date().toISOString(),
          paymentStatus: 'Status pagamento teste 1',
          financialObservation: 'Observação financeiro Teste 1'
        }
      ]

      // TODO: No futuro, implementar query aqui e enviar somente o resultado
      await this.generateSintheticReport(syntheticDataMock, res)
    } else {
      const analyticalDataMock: AnalyticalReportDto[] = [
        {
          representative: 'Representante teste 1',
          customerCode: '0123456789',
          customerName: 'Cliente teste 1',
          socialReason: 'Razão social teste 1',
          establishment: 'Teste 1',
          nfTitle: '0123456789',
          nfValue: 'R$100,00',
          dueDate: new Date().toISOString(),
          deliveryDate: new Date().toISOString(),
          deadline: 5,
          duplicateExpiration: new Date().toISOString(),
          installment: 5,
          amountInstallment: 'R$100,00',
          installmentBalance: 'R$0,00',
          paymentStatus: 'Status pagamento teste 1',
          financialObservation: 'Observação financeiro Teste 1'
        }
      ]

      // TODO: No futuro, implementar query aqui e enviar somente o resultado
      await this.generateAnalyticalReport(analyticalDataMock, res)
    }
  }
}
