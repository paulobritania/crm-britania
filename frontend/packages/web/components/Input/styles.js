import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

export const theme = (muiTheme) => ({
  ...muiTheme,
  overrides: {
    ...(muiTheme.overrides || {}),
    MuiOutlinedInput: {
      ...(muiTheme.overrides?.MuiOutlinedInput || {}),
      root: {
        ...(muiTheme.overrides?.MuiOutlinedInput?.root || {}),
        height: undefined
      },
      multiline: {
        width: 'auto',
        borderRadius: 3
      }
    }
  }
})
