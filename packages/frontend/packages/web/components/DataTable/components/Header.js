import React, { memo } from 'react'

import TableHeader from 'material-table/dist/components/m-table-header'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types
const Header = memo(({
  tableHeaderClassName,
  ...props
}) => (
  <TableHeader
    { ...props }
    classes={ { header: tableHeaderClassName } }
  />
))

Header.propTypes = { tableHeaderClassName: PropTypes.string }

Header.defaultProps = { tableHeaderClassName: null }

export default Header
