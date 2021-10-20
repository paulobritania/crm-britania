import React, {
  useMemo,
  useCallback,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

import { useT } from '@britania-crm/i18n'
// import { reportVpc as reportVpcCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
// import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import colors from '@britania-crm/styles/colors'
import { formatMoney } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import PageFilter from '@britania-crm/web-components/PageFilter'

import reportVpcFormFilter from '../../containers/reportVpcFormFilter/ReportVpcFormFilter'
import {
  Container,
  CompaniesBranch
} from './styles'

const ReportContractPercentageScreen = () => {
  const t = useT()

  const history = useHistory()

  const [filters, setFilters] = useState({})

  // const {
  //   data,
  //   loading
  // } = useCrmApi([reportVpcCrmRoutes.getAll, filters], { params: filters })

  const MOCK_MAIN_DATA = useMemo(() => [
    {
      id: 1,
      customer: 'Carrefour',
      percentage: '10%',
      value: '100',
      homeLine: {
        storeActions: { percentage: '100%', value: '50' },
        bonus: { percentage: '100%', value: '50' },
        growth: { percentage: '100%', value: '50' },
        flow: { percentage: '100%', value: '50' },
        presidency: { percentage: '100%', value: '50' },
        vpc: { percentage: '100%', value: '50' },
        ve: { percentage: '100%', value: '50' }
      },
      kitchenLine: {
        storeActions: { percentage: '100%', value: '50' },
        bonus: { percentage: '100%', value: '50' },
        growth: { percentage: '100%', value: '50' },
        flow: { percentage: '100%', value: '50' },
        presidency: { percentage: '100%', value: '50' },
        vpc: { percentage: '100%', value: '50' },
        ve: { percentage: '100%', value: '50' }
      }
    }
  ]
  , [])

  const columnsMain = useMemo(() => [
    {
      title: t('customer', { howMany: 1 }),
      field: 'customer'
    },
    {
      title: t('percentage', { howMany: 1 }),
      field: 'percentage'
    },
    {
      title: t('value', { howMany: 1 }),
      field: 'value',
      render: (row) => formatMoney(row.value)
    }
  ], [t])

  const henderColumns = useCallback(
    (percentage, value) =>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="subtitle2" gutterBottom style={ { color: colors.secondary.main } }> % </Typography>
          { percentage}
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" gutterBottom style={ { color: colors.secondary.main } }>
            {t('value', { howMany: 1 })}
          </Typography>
          {formatMoney(value)}
        </Grid>
      </Grid>
    ,
    [t]
  )

  const columnsFan = useMemo(() => [
    {
      title: t('type'),
      field: 'type'
    },
    {
      title: t('store actions'),
      field: 'storeActions',
      render: ({ storeActions }) => henderColumns(storeActions.percentage, storeActions.value)
    },
    {
      title: t('bonus'),
      field: 'bonus',
      render: ({ bonus }) => henderColumns(bonus.percentage, bonus.value)
    },
    {
      title: t('growth'),
      field: 'growth',
      render: ({ growth }) => henderColumns(growth.percentage, growth.value)
    },
    {
      title: t('flow'),
      field: 'flow',
      render: ({ flow }) => henderColumns(flow.percentage, flow.value)
    },
    {
      title: t('presidency'),
      field: 'presidency',
      render: ({ presidency }) => henderColumns(presidency.percentage, presidency.value)
    },
    {
      title: 'VPC',
      field: 'vpc',
      render: ({ vpc }) => henderColumns(vpc.percentage, vpc.value)
    },
    {
      title: 'VE',
      field: 've',
      render: ({ ve }) => henderColumns(ve.percentage, ve.value)
    }
  ], [henderColumns, t])

  const handleFilter = useCallback(
    (values) => {
      setFilters(pickBy(values, identity))
    },
    []
  )

  return (
    <>
      <PageFilter
        Form={ reportVpcFormFilter }
        handleFilter={ handleFilter }
      />
      <Container>
        <DataTable
          options={ { search: false } }
          data={ MOCK_MAIN_DATA }
          columns={ columnsMain }
          filters={ filters }
          title={ t('contract percentage') }
          onGoBack={ history.goBack }
          onExportClick={ () => {} }
          detailPanel = { [{
            icon: Add,
            openIcon: Remove,
            iconProps: { fontSize: 'small' },
            tooltip: t('view more'),
            render: (row) => (
              <CompaniesBranch>
                <Grid
                  container
                  spacing={ 1 }
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={ { padding: 15 } }
                >
                  <DataTable
                    data={ [{ ...row.homeLine, type: 'Linha casa' }, { ...row.kitchenLine, type: 'Linha cozinha' }] }
                    columns={ columnsFan }
                    options={ { search: false } }
                  />
                </Grid>
              </CompaniesBranch>
            )
          }] }
        />
      </Container>
    </>
  )
}

export default ReportContractPercentageScreen
