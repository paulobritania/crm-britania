import React from 'react'

import PropTypes from 'prop-types'

import Popover from '@material-ui/core/Popover'

import useStyles from './styles'

const Popup = ({
  open, anchorEl, children
}) => {
  const classes = useStyles()

  return (
    <Popover
      classes={ { paper: classes.paper } }
      open={ open }
      anchorEl={ anchorEl }
      anchorReference="anchorPosition"
      anchorPosition={ { top: 400, left: 700 } }
      anchorOrigin={ {
        vertical: 'center',
        horizontal: 'left'
      } }
      transformOrigin={ {
        vertical: 'center',
        horizontal: 'left'
      } }
    >
      {children}
    </Popover>
  )
}

Popup.propTypes = {
  anchorEl: PropTypes.object,
  children: PropTypes.element,
  open: PropTypes.bool
}

Popup.defaultProps = {
  open: false,
  anchorEl: {},
  children: ''
}

export default Popup
