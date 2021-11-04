import styled from 'styled-components'

import merge from 'lodash/merge'

import { makeStyles } from '@material-ui/core/styles'

import InputLabel from '@material-ui/core/InputLabel'
import { TextField } from '@material-ui/core'

import { colors } from '@britania-crm/styles'
import fonts from '@britania-crm/styles/fonts'

export const theme = (theme) => (muiTheme) => {
  const customTheme = {
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
          borderRadius: 3,
          border: '1px solid #D3DCE6',
          '&:disabled': { background: 'red' }
        }
      },

      MuiOutlinedInput: {
        ...(muiTheme.overrides?.MuiOutlinedInput || {}),
        root: {
          ...(muiTheme.overrides?.MuiOutlinedInput?.root || {}),
          background: colors.grey20,
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
        }
      }
    }
  }

  return merge(customTheme, theme)
}

const useStyles = makeStyles({
  menuItem: {
    borderTop: `1px solid ${colors.grey2}`,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    marginTop: -1
  },
  checkbox: { padding: 0, marginRight: 8 }
})

export const InputLabelStyled = styled(InputLabel)`
  font-size: ${fonts.fontSize.SSB} !important;
  font-family: ${fonts.fontFaceMavenPro[0].fontFamily};
  font-weight: ${fonts.fontWeight.regular};
  color: '#1F2D3D';
  line-height: '20px';
`

export const TextFieldStyled = styled(TextField).withConfig({
  shouldForwardProp: (propName) =>
    propName !== 'minWidth' && propName !== 'validateOnBlur'
})`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};

  pointer-events: ${(props) => (props.readOnly ? 'none' : 'auto')};

  margin-bottom: 10px;

  input {
    font-size: 14px;
  }
`

export default useStyles
