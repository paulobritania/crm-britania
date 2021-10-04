import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import { useT } from '@britania-crm/i18n'
import { useSnackbar } from '@britania-crm/snackbar'

import { StyledForm } from './styles'

const Form = forwardRef(({ filters, ...props }, formRef) => {
  const snackbar = useSnackbar()
  const t = useT()

  const handleInvalidForm = useCallback(
    (errors) => {
      console.error('form errors:', errors)
      snackbar.error(t('form contain errors. please review the data'))
    },
    [snackbar, t]
  )

  return (
    <StyledForm
      ref={ formRef }
      { ...props }
      noValidate
      onInvalidForm={ handleInvalidForm }
    >
      {props.children}
    </StyledForm>
  )
})

Form.propTypes = {
  schemaConstructor: PropTypes.func,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  children: PropTypes.any,
  filterEmptyValues: PropTypes.bool,
  filters: PropTypes.object
}

Form.defaultProps = {
  schemaConstructor: undefined,
  defaultValues: {},
  onSubmit () {},
  children: null,
  filterEmptyValues: false,
  filters: undefined
}

export default Form
