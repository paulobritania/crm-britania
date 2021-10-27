import React from 'react'

import PropTypes from 'prop-types'

import { ThemeProvider } from '@material-ui/core/styles'

import TextField from '@britania-crm/web-components/TextField'

import { theme } from './styles'

const TextArea = ({
  rows,
  inputProps,
  ...rest
}) => (
  <ThemeProvider theme={ theme }>
    <TextField
      variant="outlined"
      inputProps={ { ...inputProps } }
      multiline
      rows={ rows }
      { ...rest }
    />
  </ThemeProvider>
)

TextArea.propTypes = {
  rows: PropTypes.number,
  inputProps: PropTypes.object
}

TextArea.defaultProps = {
  rows: 8,
  inputProps: {}
}

export default TextArea
