import React, { useState, useCallback, useRef } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'

import useStyles from './styles'

const PageFilter = ({ Form, handleFilter, filters, clearSearch }) => {
  const formRef = useRef(null)
  const classes = useStyles()

  const handleClearForm = useCallback(() => {
    formRef.current.reset()
    clearSearch()

    setTimeout(() => {
      formRef.current.submit()
    }, 100)
  }, [])

  const handleSubmit = useCallback(
    (values) => handleFilter(values),
    [handleFilter]
  )

  return (
    <Grid item style={{ display: 'flex' }}>
      <Form ref={formRef} onSubmit={handleSubmit} filterEmptyValues />
      <I18n
        className={classes.buttonClear}
        as={Button}
        variant='text'
        color='secondary'
        onClick={handleClearForm}
      >
        cleanFilter
      </I18n>
    </Grid>
  )
}

export default React.memo(PageFilter)

PageFilter.propTypes = {
  Form: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  handleFilter: PropTypes.func.isRequired,
  filters: PropTypes.object
}

PageFilter.defaultProps = { filters: {} }
