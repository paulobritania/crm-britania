import React from 'react'

import PropTypes from 'prop-types'

import map from 'lodash/map'

import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'

import Button from '../Button'
import { useStyles } from './styles'

const Pagination = ({
  pageOptions,
  state: { pageIndex },
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage
}) => {
  const classes = useStyles()

  return (
    <div className={ classes.paginationContainer }>
      <Button variant="outlined" color="primary" onClick={ () => previousPage() } disabled={ !canPreviousPage } startIcon={ <ArrowLeft /> } />
      <ButtonGroup color="primary" variant="text" size="small" aria-label="small text outlined button group">
        {
          map(pageOptions, (index) => (
            <Button variant="outlined" key={ index } onClick={ () => gotoPage(index) } disabled={ index === pageIndex } >{index + 1}</Button>
          ))
        }
      </ButtonGroup>
      <Button color="primary" variant="outlined" onClick={ () => nextPage() } disabled={ !canNextPage } startIcon={ <ArrowRight /> } />
    </div>
  )
}

Pagination.propTypes = {
  pageOptions: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  gotoPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired
}

export default Pagination
