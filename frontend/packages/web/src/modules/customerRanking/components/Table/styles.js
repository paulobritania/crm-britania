import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const Container = styled(Paper)`
    border-radius: 25px;
    padding: 15px;
`
export const TableContainer = styled.div`
  padding-top: 24px;
  display: block;
  max-width: 100%;


  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    max-height: 80vh
  }

  table {
    width: 100%;
    border-spacing: 0;

    thead {
      tr {
        :last-child {
          color: ${ colors.britPrimary2.base };
          font-size: ${ fonts.fontSize.SSB }px;
          line-height: ${ fonts.fontSize.L }px;
        }
      }
    }
    tr {
      :first-child {
        border-bottom: none;
      }
      :last-child {
        td {
          border: none;
        }
      }
    }
    tfoot td {
      border-top: 1px solid ${ colors.britPrimary1.lighter };
      border-bottom: none;
    }

    th,
    td {
      text-align: left;
      margin: 0;
      padding-left: 8px;
      padding-right: 8px;
      padding-bottom: 8px;
      padding-top: 15px;
      border-bottom: 1px solid ${ colors.britPrimary1.lighter };
      :last-child {
        border-right: 0;
      }
    }
  }
`
