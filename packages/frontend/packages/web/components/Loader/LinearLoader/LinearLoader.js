import React from 'react'

import PropTypes from 'prop-types'

import LinearProgress from '@material-ui/core/LinearProgress'

import useStyles from './styles'

const LinearLoader = (props) => {
  const {
    loading,
    value,
    className,
    ...otherProps
  } = props

  const classes = useStyles()

  if (!loading) {
    otherProps.value = value === 0 ? 0 : 100
    otherProps.variant = 'determinate'
  }

  return (
    <div className={ classes.root }>
      <LinearProgress
        color="primary"
        classes={ { root: [classes.linearProgress, className].join(' ') } }
        { ...otherProps }
      />
    </div>
  )
}

LinearLoader.propTypes = {
  loading: PropTypes.bool,
  value: PropTypes.number,
  className: PropTypes.string
}

LinearLoader.defaultProps = {
  loading: true,
  value: undefined,
  className: null
}

export default LinearLoader
