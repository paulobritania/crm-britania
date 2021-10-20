import React, {
  useMemo,
  useEffect,
  useState,
  memo
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import { useT } from '@britania-crm/i18n'
import { formatBackDateTimeToFriendlyFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'

const WorkFlowProgress = (props) => {
  const { workflowInProgress, fieldDescription } = props

  const t = useT()

  const [data, setData] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('requester'),
        field: 'requester',
        editable: 'never',
        width: 100
      },
      {
        title: t('date and hour'),
        field: 'date',
        editable: 'never',
        width: 200,
        render: (row) => formatBackDateTimeToFriendlyFormat(row.date)
      },
      {
        title: t('change'),
        field: fieldDescription,
        editable: 'always',
        width: 300
      },
      {
        title: t('justification'),
        field: 'justification',
        editable: 'always'
      }
    ],
    [fieldDescription, t]
  )

  const options = useMemo(
    () => ({
      search: false,
      sorting: false,
      paging: false
    }),
    []
  )

  useEffect(
    () => {
      setData(isEmpty(workflowInProgress) ? [] : [workflowInProgress])
    },
    [workflowInProgress]
  )

  return !isEmpty(data) && (
    <DataTable
      options={ options }
      data={ data }
      columns={ columns }
    />
  )
}

WorkFlowProgress.propTypes = {
  workflowInProgress: PropTypes.object,
  fieldDescription: PropTypes.string.isRequired
}

WorkFlowProgress.defaultProps = { workflowInProgress: {} }

export default memo(WorkFlowProgress)
