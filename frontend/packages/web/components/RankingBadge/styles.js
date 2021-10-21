import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'

import colors from '@britania-crm/styles/colors'

export default makeStyles({ containedWarning: { color: colors.warning.main } })

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Star = styled(StarIcon)`
  color: ${ (props) => props.iconcolor ? `${ props.iconcolor }` : `${ colors.britSupport1.base }` };
  font-size: 24px;
  margin-right: 7px;
`
