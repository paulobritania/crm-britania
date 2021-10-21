import React, {
  useMemo,
  memo
} from 'react'

import PropTypes from 'prop-types'

import CardContent from '@material-ui/core/CardContent'

import { useT } from '@britania-crm/i18n'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { colors } from '@britania-crm/styles'
import { formatBackDateTimeToFriendlyDateFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'

const HistoryTableDetails = ({ detailsUrl }) => {
  const t = useT()

  const { data, loading } = useCrmApi(detailsUrl)

  const columns = useMemo(
    () => [
      {
        title: t('workflow'),
        field: 'workflowVersion'
      },
      {
        title: t('task', { howMany: 1 }),
        field: 'taskTitle'
      },
      {
        title: t('response', { requiresJustification: false }),
        field: 'responseTitle'
      },
      {
        title: t('approver'),
        field: 'responder'
      },
      {
        title: t('justification'),
        field: 'justification'
      },
      {
        title: t('date and hour'),
        field: 'respondedAt',
        type: 'date',
        render: (row) => formatBackDateTimeToFriendlyDateFormat(row.respondedAt)
      }
    ],
    [t]
  )

  const options = useMemo(
    () => ({
      search: true,
      headerStyle: { backgroundColor: 'transparent' }
    }),
    []
  )

  return (
    <CardContent
      style={ {
        backgroundColor: colors.britPrimary2.lightest,
        marginLeft: 20,
        marginRight: 20
      } }
    >
      <DataTable
        title={ t('detailed history') }
        titleProps={ {
          variant: 'h5',
          style: { fontWeight: 'normal' }
        } }
        data={ data }
        columns={ columns }
        minimalistToolbar
        options={ options }
        backgroundColor="transparent"
        dividerColor={ colors.britSupport1.base }
        searchFieldAlignment="right"
        loading={ loading }
      />
    </CardContent>
  )
}

HistoryTableDetails.propTypes = { detailsUrl: PropTypes.string }

HistoryTableDetails.defaultProps = { detailsUrl: null }

export default memo(HistoryTableDetails)
