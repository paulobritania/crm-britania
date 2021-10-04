import React from 'react'
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
  useFilters,
  usePagination
} from 'react-table'

import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'

import Body from './Body'
import Header from './Header'
import Pagination from './Pagination'
import { useStyles } from './styles'

const TableList = ({
  columns,
  data,
  onRowClick,
  sortBy
  // filtersParam,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy,
        filters: [
          // ...filtersParam
        ]
      }
    },
    useFilters,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    usePagination
  )

  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <MaUTable { ...getTableProps() } className={ classes.root } size="medium" >
        <Header headerGroups={ headerGroups } />
        <Body
          { ...getTableBodyProps() }
          prepareRow={ prepareRow }
          onRowClick={ onRowClick }
          rows={ page }
        />
      </MaUTable>
      <Pagination
        pageOptions={ pageOptions }
        page={ page }
        state= { { pageIndex, pageSize } }
        gotoPage={ gotoPage }
        previousPage={ previousPage }
        nextPage={ nextPage }
        setPageSize={ setPageSize }
        canPreviousPage={ canPreviousPage }
        canNextPage={ canNextPage }
      />
    </>
  )
}

TableList.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sortBy: PropTypes.array.isRequired,
  onRowClick: PropTypes.func
}

TableList.defaultProps = {
  onRowClick () {},
  sortBy: []
}

export default TableList
