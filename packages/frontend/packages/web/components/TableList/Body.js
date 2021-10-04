import React from 'react'

import PropTypes from 'prop-types'

const Body = ({
  rows, prepareRow, onClickInRow, ...rest
}) => (
  <tbody { ...rest }>
    {rows.map((row, i) => {
      prepareRow(row)
      return (
        <tr { ...row.getRowProps() } key={ String(i) }>
          {row.cells.map((cell, index) => (
            <td
              onClick={ () => cell.column.id !== 'actions' && onClickInRow(row.original) }
              { ...cell.getCellProps([
                {
                  className: cell.column.className,
                  style: cell.column.style
                }
              ]) } key={ String(index) }
            >
              {cell.render('Cell')}
            </td>
          ))}
        </tr>
      )
    })}
  </tbody>
)

Body.propTypes = {
  rows: PropTypes.array.isRequired,
  prepareRow: PropTypes.func.isRequired,
  onClickInRow: PropTypes.func
}

Body.defaultProps = { onClickInRow () {} }

export default Body
