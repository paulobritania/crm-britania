import React from 'react'

import PropTypes from 'prop-types'

import TooltipMui from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

const Tooltip = ({
  children, enterDelay, className, ...rest
}) => (
  <TooltipMui
    enterDelay={ enterDelay }
    TransitionComponent={ Zoom }
    { ...rest }
    classes={ {
      popper: className,
      ...(rest.classes || {})
    } }
  >
    {children && (
      <div>
        {children}
      </div>
    )}
  </TooltipMui>
)

Tooltip.propTypes = {
  /** Delay in ms to tooltip show */
  enterDelay: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string
}

Tooltip.defaultProps = {
  enterDelay: 500,
  children: null,
  className: null
}

export default Tooltip
