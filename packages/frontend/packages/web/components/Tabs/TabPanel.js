import React, { memo } from 'react'

import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

const TabPanel = ({
  children,
  value,
  index,
  ...rest
}) => (
  <div
    role="tabpanel"
    hidden={ value !== index }
    id={ `full-width-tabpanel-${ index }` }
    aria-labelledby={ `full-width-tab-${ index }` }
    { ...rest }
  >
    <Box style={ { display: value === index ? 'block' : 'none' } }>
      {children}
    </Box>
  </div>
)

TabPanel.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}

export default memo(TabPanel)
