import React, {
  useMemo,
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import { map } from 'lodash'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import { formatMoney } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import CancelIcon from '@britania-crm/web-components/Icons/CancelIcon'
import InputHidden from '@britania-crm/web-components/InputHidden'
import StatusSwitch from '@britania-crm/web-components/StatusSwitch'
import Tooltip from '@britania-crm/web-components/Tooltip'
import CancelNdModal from '@britania-crm/web-src/modules/vpc/modals/CancelNdModal'
import NewNdModal from '@britania-crm/web-src/modules/vpc/modals/NewNdModal'

import { Container } from './styles'

const VpcNd = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [nds, setNds] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('nd number'),
        field: 'number',
        defaultSort: 'asc'
      },
      {
        title: t('issuing company nd'),
        field: 'issuerCompanyName',
        sorting: false
      },
      {
        title: t('value'),
        field: 'value',
        sorting: false,
        render: (row) => formatMoney(row.value)
      },
      {
        title: t('company'),
        field: 'company',
        sorting: false
      },
      {
        title: t('issue date'),
        field: 'issueDate',
        sorting: false,
        render: (row) => formatBackDateToFriendlyFormat(row.issueDate)
      },
      {
        title: t('due date'),
        field: 'dueDate',
        sorting: false,
        render: (row) => formatBackDateToFriendlyFormat(row.dueDate)
      },
      {
        title: t('observation', { howMany: 2 }),
        field: 'observation',
        sorting: false,
        width: 50,
        render (row) {
          if (row?.observation) {
            const newString = row.observation.slice(0, 10)
            return (
              <div>
                <Tooltip title={ row.observation } arrow>
                  {newString.concat('...')}
                </Tooltip>
              </div>
            )
          }
          return ''
        }
      },
      {
        title: t('status'),
        field: 'active',
        render: (row) => (
          <StatusSwitch
            detached
            name="status"
            value={ row.active }
            readOnly
          />
        )
      }
    ],
    [t]
  )

  const actions = useMemo(
    () => {
      if (disabled) return []
      return [
        (row) => ({
          icon: CancelIcon,
          tooltip: row.reasonDeactivation || t('cancel'),
          position: 'row',
          disabled: !row.active,
          iconButtonProps: {
            style: { marginLeft: 10 },
            size: 'small'
          },
          onClick: () => createDialog({
            id: 'cancel-nd-modal',
            Component: CancelNdModal,
            props: {
              onConfirm ({ reasonDeactivation }) {
                formRef.current.setFieldValue(
                  'nds',
                  (old) => map(old, (nd, index) => index !== row.tableData.id ? nd : {
                    ...nd,
                    active: false,
                    reasonDeactivation
                  })
                )
              }
            }
          })
        })
      ]
    },
    [createDialog, disabled, formRef, t]
  )

  const handleChangeNds = useCallback(
    (value, fieldMounted) => {
      setNds(value)
      if (fieldMounted) {
        formRef.current.validateField('value')
      }
    },
    [formRef]
  )

  const handleAddNewNd = useCallback(
    () => createDialog({
      id: 'modal-add-new-product',
      Component: NewNdModal,
      props: {
        onSubmit (nd) {
          formRef.current.setFieldValue('nds', (old) => [...old, nd])
        }
      }
    }),
    [createDialog, formRef]
  )

  return (
    <Container>
      <DataTable
        options={ { search: false } }
        data={ nds }
        columns={ columns }
        actions={ actions }
        title={ t('nd list') }
        addTitle={ t('add new nd') }
        onAddClick={ !disabled && handleAddNewNd }
      />
      <InputHidden
        name="nds"
        showError
        onValueChange={ handleChangeNds }
      />
    </Container>
  )
}

VpcNd.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default VpcNd
