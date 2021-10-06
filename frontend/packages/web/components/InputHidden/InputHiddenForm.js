import React, { forwardRef } from 'react'

import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import FormHelperText from '@material-ui/core/FormHelperText'
import InfoIcon from '@material-ui/icons/Info'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'
import { colors } from '@britania-crm/styles'

const InputHiddenForm = (props) => {
  const { showError } = props

  const { error } = useField()

  return showError && (
    <div style={ { marginLeft: 10, marginBottom: 10 } }>
      {!!error && (
        <FormHelperText error>
          <Box style={ { color: colors.error.main } } component="span" display="flex" alignItems="center">
            <InfoIcon fontSize="small" style={ { marginRight: '8px' } } />
            {' '}{ error }
          </Box>
        </FormHelperText>
      )}
    </div>
  )
}

InputHiddenForm.propTypes = { showError: PropTypes.bool.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ InputHiddenForm }
    touchOnChange
    validateOnBlur
  />
))

Field.propTypes = {
  showError: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onValueChange: PropTypes.func,
  path: PropTypes.string
}

Field.defaultProps = {
  showError: false,
  disabled: false,
  onChange () {},
  onValueChange () {},
  onBlur () {},
  path: 'value'
}

export default Field
