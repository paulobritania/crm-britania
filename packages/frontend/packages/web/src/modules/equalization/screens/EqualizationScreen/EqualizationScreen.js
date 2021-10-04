import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'

import { useT } from '@britania-crm/i18n'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import {
  trimMask,
  formatMoney
} from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import PageFilter from '@britania-crm/web-components/PageFilter'

import EqualizationFormFilter from '../../containers/EqualizationFormFilter/EqualizationFormFilter'
import { Container } from './styles'

const EqualizationScreen = () => {
  const t = useT()
  const history = useHistory()

  const [filters, setFilters] = useState({})

  const data = useMemo(() => [
    {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'B2W Companhia Digital',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    },
    {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'Maria Machado ME',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }, {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'Nathan Silva ME',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }, {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'Geraldo e Thomas Ltda',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }, {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'B2W Companhia Digital',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }, {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'B2W Companhia Digital',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }, {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'Bianca Yasmin Ltda',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }, {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'Kauê Rodrigues Ltda',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }, {
      equalization: '123456789',
      companyCode: '123456789',
      companyName: 'Mariane Aparecida ME',
      masterLine: 'Linha 1',
      implementationDate: '2021-06-10T13:14:08.899Z',
      value: 100.00,
      balance: 100.00,
      status: 'Aprovado',
      summary: 'Lançamento de caixa'
    }

  ], [])

  const columns = useMemo(() => [
    {
      title: t('equalization'),
      field: 'equalization'
    },
    {
      title: t('matrix code', { abbreviation: false }),
      field: 'companyCode'
    },
    {
      title: t('matrix'),
      field: 'companyName'
    },
    {
      title: t('master line'),
      field: 'masterLine'
    },
    {
      title: t('implantation date'),
      field: 'implementationDate',
      render: (row) => row.implementationDate ? formatBackDateToFriendlyFormat(row.implementationDate) : null
    },
    {
      title: t('value'),
      field: 'value',
      render: (row) => row.value ? formatMoney(row.value) : null
    },
    {
      title: t('outcome'),
      field: 'balance',
      render: (row) => row.balance ? formatMoney(row.balance) : null
    },
    {
      title: t('status'),
      field: 'status'
    },
    {
      title: t('campaign summary'),
      field: 'summary'
    }

  ], [t])

  const handleFilter = useCallback(
    (values) => {
      const payload = {
        cnpj: values.cnpj ? trimMask(values.cnpj) : null,
        destination: values.destination.parentCompanyCode,
        client: values.client.parentCompanyCode,
        prooduct: values.destination.parentCompanyCode,
        origin: values.origin,
        startDate: values.date.from,
        endDate: values.date.to
      }
      setFilters(pickBy(payload, identity))
    },
    []
  )

  return (
    <>
      <PageFilter
        handleFilter={ handleFilter }
        Form={ EqualizationFormFilter }
      />
      <Container>
        <DataTable
          data={ data }
          columns={ columns }
          filters={ filters }
          title={ t('equalization requests') }
          addTitle={ t('add new {this}', { gender: 'female', this: t('equalization', { howMany: 1 }) }) }
          onGoBack={ history.goBack }
          addFilterTitle={ t('filter data') }
          emptyMessage={ t('buyer datagrid body empty data source message') }
          options={ { search: false } }
        />
      </Container>
    </>
  )
}

export default EqualizationScreen
