import React from 'react'

import PropTypes from 'prop-types'

import InputAdornment from '@material-ui/core/InputAdornment'

import colors from '@britania-crm/styles/colors'
import PercentageIcon from '@britania-crm/web-components/Icons/PercentageIcon'
import InputNumber from '@britania-crm/web-components/InputNumber'

const InputPercentage = ({ InputProps, ...props }) => (
  <InputNumber
    { ...props }
    InputProps={ {
      ...InputProps,
      endAdornment: (
        <InputAdornment position="end">
          <PercentageIcon
            style={ { color: colors.britSupport1.light } }
          />
        </InputAdornment>
      )
    } }
  />
)

InputPercentage.propTypes = { InputProps: PropTypes.object }

InputPercentage.defaultProps = { InputProps: {} }

export default InputPercentage
