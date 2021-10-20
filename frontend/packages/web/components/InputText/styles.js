import styled from 'styled-components'

import TextFieldFromMaterial from '@material-ui/core/TextField'

import { colors } from '@britania-crm/styles'

export const theme = (muiTheme) => ({
  ...muiTheme,
  palette: {
    ...(muiTheme.palette || {}),
    primary: {
      ...(muiTheme.palette?.primary || {}),
      main: colors.britSecondary.base
    }
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
        height: 40,
        background: colors.white,
        '& fieldset': { borderColor: colors.britPrimary1.base }
      },
      input: {
        ...(muiTheme.overrides?.MuiOutlinedInput?.input || {}),
        padding: '16px 8px'
      }
    },

    MuiInputLabel: {
      ...(muiTheme.overrides?.MuiInputLabel || {}),
      root: {
        ...(muiTheme.overrides?.MuiInputLabel?.root || {}),
        marginTop: '-8px'
      },
      shrink: {
        ...(muiTheme.overrides?.MuiInputLabel?.shrink || {}),
        marginTop: 0
      },
      asterisk: {
        ...(muiTheme.overrides?.MuiInputLabel?.asterisk || {}),
        color: colors.error.main
      },
      outlined: {
        ...(muiTheme.overrides?.MuiInputLabel?.outlined || {}),
        color: colors.britPrimary1.base,
        transform: 'translate(22px, 37px) scale(1)',
        '&$shrink': { transform: 'translate(22px, 10px) scale(0.75)' }
      }
    }

  }
})

export const TextField = styled(TextFieldFromMaterial)`
  width: ${ (props) => props.width ? `${ props.width }px` : '100%' };

  margin-left: ${ (props) => props.marginLeft ? `${ props.marginLeft }px` : 0 }; 
  margin-right: ${ (props) => props.marginTop ? `${ props.marginTop }px` : 0 };
  
  padding: 16px 8px;

  pointer-events: ${ (props) => props.readOnly ? 'none' : 'auto' };  

  input {
    font-size: 15px;
  } 
`
