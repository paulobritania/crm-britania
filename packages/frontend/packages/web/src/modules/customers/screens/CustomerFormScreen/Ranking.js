import React, {
  useMemo,
  useCallback
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import PropTypes from 'prop-types'

import isNumber from 'lodash/isNumber'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useDialog } from '@britania-crm/dialog'
import I18n, { useT } from '@britania-crm/i18n'
import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { CustomerActions } from '@britania-crm/stores/customer'
import Button from '@britania-crm/web-components/Button'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'
import DataTable from '@britania-crm/web-components/DataTable'
import RankingBadge from '@britania-crm/web-components/RankingBadge'
import WorkFlowExecution from '@britania-crm/web-src/modules/workflow/containers/WorkFlowExecution'

import WorkFlowHistoryModal from '../../../workflow/modals/WorkFlowHistoryModal/WorkFlowHistoryModal'
import RankingChangeModal from '../../modals/RankingChangeModal'
import useStyles, { HistoryButton } from './styles'

const Ranking = ({
  matrixCode,
  data,
  currentRanking,
  oldRanking,
  isDisabled,
  handleDocumentation,
  hasPermission,
  viewMode,
  workflowTaskInProgress,
  workflowInProgress,
  id
}) => {
  const t = useT()
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const { createDialog } = useDialog()

  const assumptionsData = useMemo(() =>
    [
      {
        assumptions: '% Crescimento',
        lastPercentage: isNumber(data?.growth) ? `${ data?.growth }%` : '-'
      },
      {
        assumptions: '% Devolução',
        lastPercentage: isNumber(data?.devolution) ? `${ data?.devolution }%` : '-'
      },
      {
        assumptions: '% Introdução de Produto',
        lastPercentage: isNumber(data?.productIntroduction) ? `${ data?.productIntroduction }%` : '-'
      },
      {
        assumptions: 'Condição de Pagamento',
        lastPercentage: isNumber(data?.paymentTerms) ? `${ data?.paymentTerms }%` : '-'
      }

    ]
  , [data])

  const columns = useMemo(() => [
    {
      title: t('assumptions'),
      field: 'assumptions'
    },
    {
      title: t('last percentage', { howMany: 1 }),
      field: 'lastPercentage'
    }
  ], [t])

  const onClickAlterRanking = useCallback(
    () => createDialog({
      id: `alter-ranking-modal-${ matrixCode }`,
      Component: RankingChangeModal,
      props: {
        onSuccess (values) {
          dispatch(CustomerActions.changeRankings(matrixCode, values, () => {
            history.go(0)
          }))
        },
        matrixCode
      }
    }),
    [createDialog, dispatch, history, matrixCode]
  )

  const handleOpenWorkflowHistoryModal = useCallback(
    () => createDialog({
      id: 'WorkFlowModal',
      Component: WorkFlowHistoryModal,
      props: { baseUrl: `${ customerCrmRoutes.getOne }/ ${ id }/ranking` }
    }),
    [createDialog, id]
  )

  return (
    <CustomAccordion header={ t('ranking') } handleInfo={ handleDocumentation }>
      <Grid container item spacing={ 1 } sm={ 12 } className={ classes.containerRanking }>
        <Grid item sm={ 12 } md={ 4 } className={ classes.ranking }>
          <I18n as={ Typography } variant="body2" >
          previous ranking
          </I18n>
          <RankingBadge type={ oldRanking } />
        </Grid>
        <Grid item sm={ 12 } md={ 4 } className={ classes.ranking }>
          <I18n as={ Typography } variant="body2">
          current ranking
          </I18n>
          <RankingBadge type={ currentRanking } />
        </Grid>
        <Grid item sm={ 12 } md={ 4 } className={ classes.ranking }>
          {
            !isDisabled && (
              <I18n as={ Button }
                color="secondary"
                variant="contained"
                className={ classes.btnSave }
                onClick={ onClickAlterRanking }
              >
            request ranking change
              </I18n>
            )
          }
        </Grid>
        <Grid item sm={ 12 }>
          <DataTable
            data={ assumptionsData }
            columns={ columns }
            options={ { search: false } }
          />
        </Grid>
        {hasPermission && !isDisabled && (
          <Grid item sm={ 12 }>
            <WorkFlowExecution
              baseUrl={ `${ customerCrmRoutes.getOne }/${ id }/ranking` }
              taskInProgress={ workflowTaskInProgress }
              workflowInProgress={ workflowInProgress }
              fieldDescription="requestedRanking.description"
            />
          </Grid>
        )}
        {hasPermission && viewMode && (
          <Grid item sm={ 12 }>
            <I18n
              as={ HistoryButton }
              onClick={ handleOpenWorkflowHistoryModal }
              color="default"
              variant="outlined"
              style={ { marginTop: 10 } }
            >
          workflow history
            </I18n>
          </Grid>
        )}
      </Grid>
    </CustomAccordion>
  )
}

Ranking.propTypes = {
  data: PropTypes.array,
  currentRanking: PropTypes.string,
  oldRanking: PropTypes.string,
  matrixCode: PropTypes.number,
  isDisabled: PropTypes.bool,
  handleDocumentation: PropTypes.func,
  hasPermission: PropTypes.bool,
  viewMode: PropTypes.bool,
  workflowTaskInProgress: PropTypes.object,
  workflowInProgress: PropTypes.object,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

Ranking.defaultProps = {
  data: [],
  matrixCode: null,
  currentRanking: '',
  oldRanking: '',
  isDisabled: false,
  handleDocumentation () {},
  workflowTaskInProgress: {},
  workflowInProgress: {},
  id: '',
  hasPermission: false,
  viewMode: false
}

export default Ranking
