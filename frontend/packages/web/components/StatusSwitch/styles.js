import styled from 'styled-components'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin-left: 0;
  min-width: 90px;
`

export default makeStyles({
  root: {
    height: '16px !important',
    marginRight: '12px !important',
    padding: '0 !important',
    width: '28px !important'
  },
  switchBase: {
    color: `${ colors.white } !important`,
    padding: '2px !important'
  },
  checked: {
    transform: 'translateX(12px) !important',
    '& + $track': { backgroundColor: `${ colors.success.main } !important` }
  },
  thumb: {
    height: '12px !important',
    width: '12px !important'
  },
  track: {
    backgroundColor: `${ colors.error.main } !important`,
    borderRadius: '25px !important'
  }
})
