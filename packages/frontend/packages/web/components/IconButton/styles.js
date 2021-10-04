import styled from 'styled-components'

import MuiIconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  spanIconButton: { display: 'flex' },
  iconButtonMarginVertical: {
    marginTop: 2.5,
    marginBottom: 2.5
  },
  iconButtonMarginHorizontal: {
    marginLeft: 2.5,
    marginRight: 2.5
  },
  colorSuccess: {
    color: theme.palette.success.main,
    '&:hover': { color: theme.palette.success.main }
  },
  colorError: {
    color: theme.palette.error.main,
    '&:hover': { color: theme.palette.error.main }
  },
  colorWarning: {
    color: theme.palette.warning.main,
    '&:hover': { color: theme.palette.warning.main }
  },
  colorInfo: {
    color: theme.palette.info.main,
    '&:hover': { color: theme.palette.info.main }
  },
  colorCare: {
    color: theme.palette.care.main,
    '&:hover': { color: theme.palette.care.main }
  }
}))

export const StyledIconButton = styled(MuiIconButton)``
