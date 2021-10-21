import styled from 'styled-components'

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'
import CircularLoader from '@britania-crm/web-components/Loader/CircularLoader'

export default makeStyles((theme) => ({
  root: { position: 'relative' },
  bottom: { color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700] },
  top: {
    color: colors.info.main,
    position: 'absolute',
    left: 0
  },
  circle: { strokeLinecap: 'round' }
}))

export const Container = styled(Box).attrs({
  position: 'relative',
  display: 'inline-flex'
})``

export const Loader = styled(CircularLoader).attrs({
  size: 115,
  thickness: 4.8,
  variant: 'determinate',
  relative: true
})``

export const PercentageContainer = styled(Box).attrs({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})``

export const Percentage = styled(Typography).attrs({
  variant: 'caption',
  component: 'div'
})`
  font-size: 32px;
  font-weight: 500;
`
