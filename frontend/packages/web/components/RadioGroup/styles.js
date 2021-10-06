import styled from 'styled-components'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const RadioStyled = withStyles({
  root: {
    '&:hover': {
      background: 'transparent',
      backgroundColor: 'transparent'
    }
  },
  checked: {
    '&:hover': {
      background: 'transparent !important',
      backgroundColor: 'transparent !important'
    }
  }
})(Radio)

export const FormControlLabelStyled = withStyles({
  root: {
    color: colors.britPrimary1.darkest,
    fontWeight: 500,
    fontSize: fonts.fontSize.S + 1
  }
})(FormControlLabel)

export const RadioGroupStyled = styled(RadioGroup)``

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled(Typography)`
`
