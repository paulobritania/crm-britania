import React from 'react'

import PropTypes from 'prop-types'

import InputAdornment from '@material-ui/core/InputAdornment'

import InputFloat from '@britania-crm/web-components/InputFloat'

const InputMoney = ({
  InputProps, unit, ...props
}) => (
  <InputFloat
    { ...props }
    decimalScale={ 2 }
    InputProps={ {
      ...InputProps,
      startAdornment: (
        <InputAdornment position="start">
          {unit}
        </InputAdornment>
      )
    } }
  />
)

InputMoney.propTypes = {
  InputProps: PropTypes.object,
  unit: PropTypes.string
}

InputMoney.defaultProps = {
  InputProps: {},
  unit: 'R$'
}

export default InputMoney
