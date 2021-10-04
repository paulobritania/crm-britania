import styled from 'styled-components'

import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const Container = styled.div`
    margin-top: 24px;
    table {
      width: 320px;
    }
    table > tbody td {
      border-bottom: none
    }
`
export const MainTitle = styled(Typography)`
    display: flex;
    font-size: 22px; 
    margin-bottom: 28px;
    color: ${ colors.britPrimary1.base }
`

export const TableCellTitles = styled(TableCell)`
  font-size: ${ fonts.fontSize.S }
  line-height: ${ fonts.fontSize.XL }
  color: ${ colors.britPrimary2.base }
`

export const TableCellValues = styled(TableCell)`
  font-size: ${ fonts.fontSize.S }
  line-height: 21px;
  color: ${ colors.black2 }
`
