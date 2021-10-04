import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin-top: 10px;
`

export const TextWarning = styled(Typography)`
  text-align: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 18px;
  max-width: 400px;
`

export default makeStyles({
  modalBackground: { backgroundColor: colors.backgroundHtml },
  title: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '16px',
    padding: '12px 13px 0 13px'
  }
})
