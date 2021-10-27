import React from 'react'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import flow from 'lodash/fp/flow'

import CssBaseline from '@material-ui/core/CssBaseline'
import NoSsr from '@material-ui/core/NoSsr'
import {
  ThemeProvider as MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'

import globalStyles from '../globalStyles'
import materialUiTheme from '../theme'

const withJssThemeProvider = (WrappedComponent) => function (props) {
  return <NoSsr>
    <MuiThemeProvider theme={ materialUiTheme }>
      <StyledThemeProvider theme={ materialUiTheme }>
        <CssBaseline />
        <WrappedComponent { ...props } />
      </StyledThemeProvider>
    </MuiThemeProvider>
  </NoSsr>
}

export default flow(
  withJssThemeProvider,
  withStyles(globalStyles)
)
