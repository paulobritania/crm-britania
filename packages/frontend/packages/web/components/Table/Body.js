import React from 'react'

import PropTypes from 'prop-types'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { useStyles } from './styles'

const Body = ({
  rows, prepareRow, onRowClick, ...rest
}) => {
  const classes = useStyles()
  return (
    <TableBody { ...rest }>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          <TableRow { ...row.getRowProps() } key={ String(i) } classes={ { root: classes.row } } >
            {row.cells.map((cell, index) => (
              <TableCell
                align={ 'left' }
                classes={ { root: classes.cell } }
                { ...cell.getCellProps([
                  {
                    className: cell.column.className,
                    style: cell.column.style
                  }
                ]) } key={ String(index) }
                onClick={ () =>
                  cell.column.className === 'actions' ? {}
                    : onRowClick(row.original)
                }
              >
                {cell.render('Cell')}
              </TableCell>
            ))}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

Body.propTypes = {
  rows: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
  onRowClick: PropTypes.func
}

Body.defaultProps = { onRowClick () {} }

export default Body
