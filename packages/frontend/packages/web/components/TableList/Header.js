import React, { useCallback } from 'react'

import PropTypes from 'prop-types'

import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Header = ({ headerGroups }) => {
  const renderIcon = useCallback(
    (column) => {
      if (column.isSortedDesc) return <ExpandMoreIcon />
      if (column.isSorted) return <ExpandLessIcon />
      return ''
    },
    []
  )

  return (
    <thead>
      {headerGroups.map((headerGroup, index) => (
        <tr key={ String(index) } { ...headerGroup.getHeaderGroupProps() }>
          {headerGroup.headers.map((column, subIndex) => (
            <th
              key={ String(subIndex) }
              { ...column.getHeaderProps([
                {
                  className: column.className,
                  style: column.style
                },
                column.getSortByToggleProps()
              ]) }
            >
              {column.render('Header')}
              <span>
                {renderIcon(column)}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

Header.propTypes = { headerGroups: PropTypes.array.isRequired }

export default Header
