
import hexToRgba from 'hex-to-rgba'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  text: { border: '1px solid transparent' },
  textSizeSmall: { padding: '3px 9px' },
  textPrimary: {
    color: colors.primary.main,
    '&:hover': {
      backgroundColor: hexToRgba(colors.primary.main, 0.05),
      border: `1px solid ${ colors.primary.main }`
    }
  },
  textSecondary: {
    color: colors.secondary.main,
    '&:hover': {
      backgroundColor: hexToRgba(colors.secondary.main, 0.05),
      border: `1px solid ${ colors.secondary.main }`
    }
  },
  textSuccess: {
    color: colors.success.main,
    '&:hover': {
      backgroundColor: hexToRgba(colors.success.main, 0.05),
      border: `1px solid ${ colors.success.main }`
    }
  },
  textWarning: {
    color: colors.warning.main,
    '&:hover': {
      backgroundColor: hexToRgba(colors.warning.main, 0.05),
      border: `1px solid ${ colors.warning.main }`
    }
  },
  textError: {
    color: colors.error.main,
    '&:hover': {
      backgroundColor: hexToRgba(colors.error.main, 0.05),
      border: `1px solid ${ colors.error.main }`
    }
  },
  textInfo: {
    color: colors.info.main,
    '&:hover': {
      backgroundColor: hexToRgba(colors.info.main, 0.05),
      border: `1px solid ${ colors.info.main }`
    }
  },
  textCare: {
    color: colors.care.main,
    '&:hover': {
      backgroundColor: hexToRgba(colors.care.main, 0.05),
      border: `1px solid ${ colors.care.main }`
    }
  },

  outlinedPrimary: {
    borderColor: colors.primary.main,
    color: colors.primary.main,
    '&:hover': { backgroundColor: hexToRgba(colors.primary.main, 0.05) }
  },
  outlinedSecondary: {
    borderColor: colors.secondary.main,
    color: colors.secondary.main,
    '&:hover': { backgroundColor: hexToRgba(colors.secondary.main, 0.05) }
  },
  outlinedSuccess: {
    borderColor: colors.success.main,
    color: colors.success.main,
    '&:hover': { backgroundColor: hexToRgba(colors.success.main, 0.05) }
  },
  outlinedError: {
    borderColor: colors.error.main,
    color: colors.error.main,
    '&:hover': { backgroundColor: hexToRgba(colors.error.main, 0.05) }
  },
  outlinedWarning: {
    borderColor: colors.warning.dark,
    color: colors.warning.dark,
    '&:hover': { backgroundColor: hexToRgba(colors.warning.main, 0.05) }
  },
  outlinedInfo: {
    borderColor: colors.info.main,
    color: colors.info.main,
    '&:hover': { backgroundColor: hexToRgba(colors.info.main, 0.05) }
  },
  outlinedCare: {
    borderColor: colors.care.main,
    color: colors.care.main,
    '&:hover': { backgroundColor: hexToRgba(colors.care.main, 0.05) }
  },

  containedPrimary: {
    backgroundColor: colors.primary.main,
    '&:hover': { backgroundColor: colors.primary.dark }
  },
  containedSecondary: {
    backgroundColor: colors.secondary.main,
    '&:hover': { backgroundColor: colors.secondary.dark }
  },
  containedSuccess: {
    backgroundColor: colors.success.main,
    '&:hover': { backgroundColor: colors.success.dark }
  },
  containedError: {
    backgroundColor: colors.error.main,
    color: colors.error.contrastText,
    '&:hover': { backgroundColor: colors.error.dark }
  },
  containedWarning: {
    backgroundColor: colors.warning.dark,
    color: colors.warning.contrastText,
    '&:hover': { backgroundColor: colors.britSecondary.darker }
  },
  containedInfo: {
    backgroundColor: colors.info.main,
    '&:hover': { backgroundColor: colors.info.dark }
  },
  containedCare: {
    backgroundColor: colors.care.main,
    '&:hover': { backgroundColor: colors.care.dark }
  }
})

export const Wrapper = styled.span`    
  position: relative;
  display: contents;
`
