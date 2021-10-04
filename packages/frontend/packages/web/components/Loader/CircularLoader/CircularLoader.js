import React from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import CircularProgress from '@material-ui/core/CircularProgress'

import { useStyles } from './styles'

function CircularLoader (props) {
  const {
    label,
    marginTop,
    style,
    className,
    fullSpace,
    relative,
    ...otherProps
  } = props

  const classes = useStyles()

  const loader = (
    <div
      className={ clsx({
        [classes.labeledLoaderContainer]: true,
        [classes.absolute]: !relative
      }) }
    >
      <CircularProgress
        className={ [classes.progress, className].join(' ') }
        style={ {
          ...style,
          marginTop: marginTop || undefined
        } }
        { ...otherProps }
      />
      {!isEmpty(label) && <span className={ classes.label }>{label}</span>}
    </div>
  )

  if (fullSpace) {
    return (
      <div className={ classes.container }>
        {loader}
      </div>
    )
  }

  return loader
}

CircularLoader.propTypes = {
  size: PropTypes.number,
  label: PropTypes.string,
  marginTop: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  fullSpace: PropTypes.bool,
  variant: PropTypes.oneOf(['determinate', 'indeterminate', 'static']),
  relative: PropTypes.bool
}

CircularLoader.defaultProps = {
  size: 40,
  label: '',
  marginTop: 30,
  style: {},
  className: null,
  fullSpace: false,
  variant: 'indeterminate',
  relative: false
}

export default CircularLoader
