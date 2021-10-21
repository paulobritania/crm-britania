import React, {
  useMemo,
  useRef
} from 'react'

import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

import I18n, { useT } from '@britania-crm/i18n'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { formatBackDateTimeToFriendlyDateFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'
import Modal from '@britania-crm/web-components/Modal'

import HistoryTableDetails from './HistoryTableDetails'
import {
  Container,
  MainTitle
} from './styles'

const WorkFlowHistoryModal = (props) => {
  const {
    id,
    open,
    baseUrl
  } = props

  const t = useT()

  const tableRef = useRef(null)

  const historyUrl = `${ baseUrl }/workflow-history`

  const { data, loading } = useCrmApi(baseUrl ? historyUrl : null)

  const columns = useMemo(
    () => [
      {
        title: t('requester'),
        field: 'requester'
      },
      {
        title: t('date and hour'),
        field: 'requestedAt',
        type: 'date',
        render: (row) => formatBackDateTimeToFriendlyDateFormat(row.requestedAt)
      },
      {
        title: t('current status'),
        field: 'lastResponseDescription'
      },
      {
        title: t('responsible', { howMany: 1 }),
        field: 'lastResponseResponder'
      },
      {
        title: t('workflow'),
        field: 'workflowVersion'
      },
      {
        title: t('workflow type'),
        field: 'workflowType'
      }
    ],
    [t]
  )

  const detailPanel = useMemo(
    () => [{
      icon: Add,
      openIcon: Remove,
      iconProps: { fontSize: 'small' },
      tooltip: t('view more'),
      render: (rowData) => (
        <HistoryTableDetails
          detailsUrl={ baseUrl ? `${ historyUrl }/${ rowData.workflowPerformedId }` : null }
        />
      )
    }],
    [baseUrl, historyUrl, t]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="lg"
      fullWidth
    >
      <Container>
        <I18n as={ MainTitle }>
          workflow history
        </I18n>
        <Grid container spacing={ 1 }>
          <DataTable
            ref={ tableRef }
            data={ data }
            columns={ columns }
            detailPanel={ detailPanel }
            options={ { search: true } }
            minimalistToolbar
            loading={ loading }
          />
        </Grid>
      </Container>
    </Modal>
  )
}

WorkFlowHistoryModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string
}

WorkFlowHistoryModal.defaultProps = { baseUrl: null }

export default WorkFlowHistoryModal
