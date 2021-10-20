import styled from 'styled-components'

import merge from 'lodash/merge'

import TextField from '@material-ui/core/TextField'

import colors from '@britania-crm/styles/colors'

export const theme = (theme) => (muiTheme) => {
  const customTheme = ({
    ...muiTheme,
    palette: {
      ...(muiTheme.palette || {}),
      primary: {
        ...(muiTheme.palette?.primary || {}),
        main: colors.britSecondary.base
      },
      secondary: colors.secondary,
      error: colors.error
    },

    overrides: {
      ...(muiTheme.overrides || {}),
      MuiInputBase: {
        ...(muiTheme.overrides?.MuiInputBase || {}),
        root: {
          ...(muiTheme.overrides?.MuiInputBase?.root || {}),
          borderRadius: 16,
          '&:disabled': { background: 'red' }
        }
      },

      MuiOutlinedInput: {
        ...(muiTheme.overrides?.MuiOutlinedInput || {}),
        root: {
          ...(muiTheme.overrides?.MuiOutlinedInput?.root || {}),
          background: colors.white,
          '& fieldset': { borderColor: colors.britPrimary1.base }
        },
        input: {
          ...(muiTheme.overrides?.MuiOutlinedInput?.input || {}),
          padding: '16px 8px',
          color: colors.primary.main
        }
      },

      MuiInputLabel: {
        ...(muiTheme.overrides?.MuiInputLabel || {}),
        asterisk: {
          ...(muiTheme.overrides?.MuiInputLabel?.asterisk || {}),
          color: colors.error.main
        },
        outlined: {
          ...(muiTheme.overrides?.MuiInputLabel?.outlined || {}),
          color: colors.britPrimary1.base
          // textOverflow: 'ellipsis',
          // whiteSpace: 'nowrap',
          // overflow: 'hidden',
          // width: '100%'
        }
      }

    }
  })

  return merge(customTheme, theme)
}

export const TextFieldStyled = styled(TextField).withConfig({
  shouldForwardProp: (propName) =>
    propName !== 'minWidth' && propName !== 'validateOnBlur'
})`
  width: ${ (props) => props.width ? `${ props.width }px` : '100%' };

  pointer-events: ${ (props) => props.readOnly ? 'none' : 'auto' };

  margin-bottom: 10px; 
  // padding: 0 4px; 

  input {
    font-size: 14px;
  } 
`
