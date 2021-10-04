import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  buttons: {
    margin: 5,
    '& span > button': {
      width: '100%',
      marginLeft: 10
    }
  }
})

export const TitleItem = styled.span`
  color: ${ colors.grey3 };
  line-height: 24px;
  font-size: 16px;
  margin-bottom: 6px;
`
