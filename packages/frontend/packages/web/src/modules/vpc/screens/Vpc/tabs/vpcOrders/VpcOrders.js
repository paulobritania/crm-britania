import React, {
  useCallback,
  useMemo,
  useState
} from 'react'

import PropTypes from 'prop-types'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { formatMoney } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import NewOrderModal from '@britania-crm/web-src/modules/vpc/modals/NewOrderModal'

import { Container } from './styles'

const VpcOrders = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [orders, setOrders] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('order number'),
        field: 'requestNumber',
        defaultSort: 'desc'
      },
      {
        title: t('establishment code'),
        field: 'establishmentCode',
        sorting: false
      },
      {
        title: t('name of the establishment'),
        field: 'establishmentName',
        sorting: false
      },
      {
        title: t('value'),
        field: 'value',
        sorting: false,
        render: (row) => formatMoney(row.value)
      }
    ],
    [t]
  )

  const handleAddNewOrder = useCallback(
    () => createDialog({
      id: 'modal-add-new-order',
      Component: NewOrderModal,
      props: {
        onSubmit (order) {
          formRef.current.setFieldValue(
            'requests',
            (old) => [...old, order]
          )
        }
      }
    }),
    [createDialog, formRef]
  )

  return (
    <Container>
      <DataTable
        options={ { search: false } }
        data={ orders }
        columns={ columns }
        title={ t('order list') }
        addTitle={ t('add new order') }
        onAddClick={ !disabled && handleAddNewOrder }
      />
      <InputHidden
        name="requests"
        showError
        onValueChange={ setOrders }
      />
    </Container>
  )
}

VpcOrders.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default VpcOrders
