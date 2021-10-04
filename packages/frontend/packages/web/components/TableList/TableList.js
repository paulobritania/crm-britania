import React from 'react'
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
  useFilters
} from 'react-table'

import PropTypes from 'prop-types'

import Body from './Body'
import Content from './Content'
import Header from './Header'

const TableList = ({
  columns,
  data,
  onClickInRow
  // filtersParam,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: {
        filters: [
          // ...filtersParam
        ]
      }
    },
    useFilters,
    useBlockLayout,
    useResizeColumns,
    useSortBy
  )

  return (
    <Content { ...getTableProps() }>
      <Header headerGroups={ headerGroups } />
      <Body
        { ...getTableBodyProps() }
        prepareRow={ prepareRow }
        onClickInRow={ onClickInRow }
        rows={ rows }
      />
    </Content>
  )
}

TableList.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onClickInRow: PropTypes.func
}

TableList.defaultProps = { onClickInRow () {} }

export default TableList
