import React, { forwardRef } from 'react'

import PropTypes from 'prop-types'

import Switch from '@material-ui/core/Switch'

import { useT } from '@britania-crm/i18n'

import useStyles, { StyledFormControlLabel } from './styles'

const StatusSwitchStyled = forwardRef(({ value, ...rest }, fieldRef) => {
  const classes = useStyles()
  const t = useT()

  return (
    <StyledFormControlLabel
      label={ t(value ? 'active' : 'inactive') }
      control={ (
        <Switch
          ref={ fieldRef }
          { ...rest }
          checked={ value }
          classes={ classes }
        />
      ) }
    />
  )
})

StatusSwitchStyled.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool
}

StatusSwitchStyled.defaultProps = {
  onChange () {},
  value: false
}

export default StatusSwitchStyled
