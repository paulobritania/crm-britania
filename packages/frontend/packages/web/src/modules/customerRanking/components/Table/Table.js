import React, { memo } from 'react'
import { useTable } from 'react-table'

import PropTypes from 'prop-types'

import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import {
  getColor,
  getAppropriatedColor
} from '../../utils'
import { TableContainer } from './styles.js'

const Table = ({
  columns,
  data,
  updateMyData,
  handleColumnEditable,
  columnEditable
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      handleColumnEditable,
      columnEditable
    }
  )

  return (
    <TableContainer>
      <div className="tableWrap">
        <MuiTable { ...getTableProps() } stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow { ...headerGroup.getHeaderGroupProps() }
                key={ index }
              >
                {headerGroup.headers.map((column, indexCell) => (
                  <TableCell { ...column.getHeaderProps() }
                    key={ indexCell }
                    style={ { background: getColor(column), top: index === 1 ? 48 : 0 } }
                  >{
                      column.render('Header')
                    }</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody { ...getTableBodyProps() }>
            {rows.map((row, index) => {
              prepareRow(row)
              return (
                <React.Fragment { ...row.getRowProps() } key={ index }>
                  <TableRow>
                    {row.cells.map((cell, index) => (
                      <TableCell
                        style={ { background: getAppropriatedColor(cell?.column?.parent?.id) } }
                        { ...cell.getCellProps() }
                        key={ index }
                      >{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              )
            })}
          </TableBody>
          <tfoot>
            {footerGroups.map((group, index) => (
              <TableRow key={ index } { ...group.getFooterGroupProps() }>
                {group.headers.map((column, index) => (
                  <TableCell
                    key={ index }
                    { ...column.getFooterProps() }
                    style={ { background: getAppropriatedColor(column?.parent?.id) } }
                  >{column.render('Footer')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tfoot>
        </MuiTable>
      </div>
    </TableContainer>
  )
}

export default memo(Table)

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  updateMyData: PropTypes.func.isRequired,
  handleColumnEditable: PropTypes.func.isRequired,
  columnEditable: PropTypes.string.isRequired
}
