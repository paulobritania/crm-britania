import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  alert: {
    width: '100%',
    // boxShadow: '2px 3px 5px -1px #b4b4b4',
    borderRadius: 8,

    '&.MuiAlert-standardSuccess': {
      color: colors.success.main,
      backgroundColor: colors.success.light
    },
    '&.MuiAlert-standardSuccess .MuiAlert-icon': { color: colors.success.main },

    '&.MuiAlert-standardInfo': {
      color: colors.info.main,
      backgroundColor: colors.info.light
    },
    '&.MuiAlert-standardInfo .MuiAlert-icon': { color: colors.info.main },

    '&. MuiAlert-standardWarning': {
      color: colors.warning.main,
      backgroundColor: colors.warning.light
    },
    '&.MuiAlert-standardWarning .MuiAlert-icon': { color: colors.warning.main },

    '&.MuiAlert-standardError': {
      color: colors.error.main,
      backgroundColor: colors.error.light
    },
    '&.MuiAlert-standardError .MuiAlert-icon': { color: colors.error.main }
  }
})

export const Container = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  width: 40%;
  left: 30%;
  top: 75px;
  flex-direction: column;
  row-gap: 15px;
`
