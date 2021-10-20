import React from 'react'

import PropTypes from 'prop-types'

import InputAdornment from '@material-ui/core/InputAdornment'

import SearchIcon from '@britania-crm/web-components/Icons/SearchIcon'
import TextField from '@britania-crm/web-components/TextField'

const InputSearch = ({ iconProps, ...props }) => (
  <TextField
    { ...props }
    type="search"
    InputProps={ {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon { ...iconProps } />
        </InputAdornment>
      )
    } }
  />
)

InputSearch.propTypes = { iconProps: PropTypes.object }

InputSearch.defaultProps = { iconProps: {} }

export default InputSearch
