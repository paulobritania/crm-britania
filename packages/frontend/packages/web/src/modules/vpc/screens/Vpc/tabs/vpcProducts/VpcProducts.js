import React, {
  useMemo,
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import NewProductModal from '@britania-crm/web-src/modules/vpc/modals/NewProductModal'

import { Container } from './styles'

const VpcProducts = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [products, setProducts] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('code'),
        field: 'code',
        width: 200
      },
      {
        title: t('name', { howMany: 1 }),
        field: 'description'
      },
      {
        title: t('quantity'),
        field: 'quantity',
        width: 100
      }
    ],
    [t]
  )

  const handleAddNewOrder = useCallback(() =>
    createDialog({
      id: 'modal-add-new-product',
      Component: NewProductModal,
      props: {
        onSubmit (product) {
          formRef.current.setFieldValue(
            'products',
            (old) => [...old, product]
          )
        }
      }
    })
  , [createDialog, formRef])

  return (
    <Container>
      <DataTable
        options={ { search: false } }
        data={ products }
        columns={ columns }
        title={ t('product list') }
        addTitle={ t('add new product') }
        onAddClick={ !disabled && handleAddNewOrder }
      />
      <InputHidden
        name="products"
        showError
        onValueChange={ setProducts }
      />
    </Container>
  )
}

VpcProducts.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default VpcProducts
