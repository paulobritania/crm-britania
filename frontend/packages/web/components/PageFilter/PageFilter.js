import React, { useState, useCallback, useRef } from 'react'

import PropTypes from 'prop-types'

import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'

import useStyles, {
  FilterWrapper,
  FilterFooter,
  AccordionHeader,
  AccordionContainer,
  AccordionSummary
} from './styles'

const PageFilter = ({ Form, handleFilter, filters }) => {
  const t = useT()
  const [expanded, setExpanded] = useState(false)
  const formRef = useRef(null)
  const classes = useStyles()

  const handleChange = useCallback(
    () => setExpanded((expanded) => !expanded),
    []
  )

  const handleClearForm = useCallback(() => {
    formRef.current.reset()

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
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        filterEmptyValues
        filters={filters}
      />
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
