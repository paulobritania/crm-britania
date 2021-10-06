import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'
import Button from '@britania-crm/web-components/Button'

export default makeStyles({
  title: {
    color: colors.primary.light,
    justifyContent: 'flex-start',
    fontSize: fonts.fontSize.XLS
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gridGap: 10,
    marginBottom: 24,
    paddingLeft: 8
  }
})

export const Container = styled(Paper)`
    border-radius: 25px;
    padding: 24px;
`
export const Footer = styled.footer`
    display: flex;
    align-items: center;
    margin-top: 24px;
    justify-content: flex-end;
`
export const CancelButton = styled(Button)`
    margin-right: 8px
`
