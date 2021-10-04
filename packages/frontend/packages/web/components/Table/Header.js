import React, { useCallback } from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useStyles } from './styles'

const Header = ({ headerGroups }) => {
  const classes = useStyles()
  const renderIcon = useCallback(
    (column) => {
      if (column.isSortedDesc) return <ExpandMoreIcon className={ classes.sortIcon } />
      if (column.isSorted) return <ExpandLessIcon className={ classes.sortIcon } />
      return ''
    },
    [classes.sortIcon]
  )

  return (
    <TableHead >
      {headerGroups.map((headerGroup, index) => (
        <TableRow key={ String(index) } { ...headerGroup.getHeaderGroupProps() } classes={ { root: classes.row } }>
          {headerGroup.headers.map((column, subIndex) => (
            <TableCell
              align={ 'left' }
              classes={ { root: clsx(classes.cell, classes.header) } }
              key={ String(subIndex) }
              { ...column.getHeaderProps([
                {
                  className: column.className,
                  style: column.style
                },
                column.getSortByToggleProps({ title: '' })
              ]) }
            >
              {column.render('Header')}
              <span className={ classes.span }>
                {renderIcon(column)}
              </span>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  )
}

Header.propTypes = { headerGroups: PropTypes.array.isRequired }

export default Header
