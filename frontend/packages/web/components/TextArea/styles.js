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
        borderRadius: 15
      }
    }
  }
})
