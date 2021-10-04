import React from 'react'

import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import TablePagination from '@material-ui/core/TablePagination'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0
  }
})

const Pagination = ({ classes, ...props }) => {
  const paginationClasses = useStyles()
  return (
    <TablePagination
      classes={ paginationClasses }
      { ...props }
    />
  )
}

Pagination.propTypes = { classes: PropTypes.object }

Pagination.defaultProps = { classes: {} }

export default Pagination
