import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import Tooltip from '@material-ui/core/Tooltip'

const StyledTooltip = styled((props) => (
  <Tooltip
    classes={ { popper: props.className } }
    { ...props }
  />
))`
    & .tooltip {
      background-color: #fff;
      box-shadow: 0 0 7px 1px rgba(0,0,0,0.3);
      color: #324552;
      font-size: 12px;
    }
 
    & .arrow {
        color: #fff;
        
    }
  `

const LightTooltip = ({ children, ...props }) => (
  <StyledTooltip { ...props }>
    {children}
  </StyledTooltip>
)

LightTooltip.propTypes = { children: PropTypes.node.isRequired }

export default LightTooltip
