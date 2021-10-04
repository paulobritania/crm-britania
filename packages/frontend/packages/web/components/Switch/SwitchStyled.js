import React, { forwardRef } from 'react'

import PropTypes from 'prop-types'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import useStyles from './styles'

const SwitchStyled = forwardRef((props, fieldRef) => {
  const {
    label,
    value,
    ...rest
  } = props

  const classes = useStyles()

  return (
    <FormControlLabel
      label={ label }
      control={
        <Switch
          ref={ fieldRef }
          color="primary"
          { ...rest }
          checked={ value }
          classes={ {
            thumb: classes.thumb,
            checked: classes.checked,
            track: classes.track
          } }
        />
      }
    />
  )
})

SwitchStyled.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool
}

SwitchStyled.defaultProps = {
  label: null,
  value: false
}

export default SwitchStyled
