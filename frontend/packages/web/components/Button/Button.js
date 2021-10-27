import React from 'react'

import PropTypes from 'prop-types'

import capitalize from 'lodash/capitalize'
import get from 'lodash/get'

import MuiButton from '@material-ui/core/Button'

import { CircularLoader } from '@britania-crm/web-components/Loader'

import useStyles, { Wrapper } from './styles'

const Button = ({
  children, color, isLoading, disabled, ...props
}) => {
  const classes = useStyles()

  const className = get(classes, `${ props.variant }${ capitalize(color) }`)

  const colorProp =
    ['default', 'inherit', 'primary', 'secondary'].indexOf(color) > -1
      ? (color)
      : undefined

  return (
    <Wrapper>
      <MuiButton
        disabled={ isLoading || disabled }
        { ...props }
        color={ colorProp }
        className={ [props.className, className].join(' ') }
        classes={ {
          text: classes.text,
          textSizeSmall: classes.textSizeSmall
        } }
      >
        {children}
        {isLoading && <CircularLoader relative marginTop={ 0 } size={ 24 } />}
      </MuiButton>
    </Wrapper>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'contained', 'text']),
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

Button.defaultProps = {
  className: null,
  variant: 'contained',
  color: 'default',
  children: null,
  isLoading: false,
  disabled: false,
  size: 'small'
}

export default Button
