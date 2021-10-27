import React, {
  forwardRef,
  memo
} from 'react'

import PropTypes from 'prop-types'

import Brightness1Icon from '@material-ui/icons/Brightness1'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'

import { colors } from '@britania-crm/styles'
import { areEqual } from '@britania-crm/utils/memo'

import {
  Checkbox,
  FormControlLabel
} from './styles'

const CheckboxStyled = forwardRef((props, fieldRef) => {
  const {
    label,
    value,
    style,
    ...rest
  } = props

  return (
    <FormControlLabel
      label={ label }
      style={ { marginBottom: 10, ...style } }
      control={
        <Checkbox
          ref={ fieldRef }
          checked={ value }
          color="primary"
          icon={ <Brightness1Icon htmlColor={ colors.grey4 } /> }
          checkedIcon={ <CircleCheckedFilled htmlColor={ colors.primary.main } /> }
          { ...rest }
        />
      }
    />
  )
})

CheckboxStyled.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  style: PropTypes.object
}

CheckboxStyled.defaultProps = {
  label: null,
  value: false,
  style: {}
}

export default memo(CheckboxStyled, areEqual)
