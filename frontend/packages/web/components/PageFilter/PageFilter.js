import React, {
  useState,
  useCallback,
  useRef
} from 'react'

import PropTypes from 'prop-types'

import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
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

const PageFilter = ({
  Form,
  handleFilter,
  filters
}) => {
  const t = useT()
  const [expanded, setExpanded] = useState(false)
  const formRef = useRef(null)
  const classes = useStyles()

  const handleChange = useCallback(() => setExpanded((expanded) => !expanded), [])

  const handleClearForm = useCallback(
    () => {
      formRef.current.reset()

      setTimeout(() => {
        formRef.current.submit()
      }, 100)
    },
    []
  )

  const handleSubmit = useCallback(
    (values) =>
      handleFilter(values)
    ,
    [handleFilter]
  )

  return (
    <FilterWrapper>
      <AccordionContainer onChange={ handleChange }>
        <AccordionSummary
          aria-controls="accordion-content"
          id="accordion-header"
        >
          <AccordionHeader>
            <I18n as={ Typography } variantMapping={ { subtitle1: 'p' } } className={ classes.labelFilter }>
              datagrid body filter row filter tooltip
            </I18n>
            <Button
              color="secondary"
              variant="text"
              className={ classes.text }
              endIcon={ expanded ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon /> }
            >{ expanded ? t('ocultar') : t('exibir')}</Button>
          </AccordionHeader>
        </AccordionSummary>
        <AccordionDetails>
          <Form
            ref={ formRef }
            onSubmit={ handleSubmit }
            filterEmptyValues
            filters={ filters }
          />
        </AccordionDetails>
        <FilterFooter>
          <I18n
            as={ Button }
            onClick={ handleClearForm }
            color="secondary"
            variant="text"
          >
            clean
          </I18n>
          <I18n
            as={ Button }
            onClick={ () => formRef.current.submit() }
            variant="contained"
            color="secondary"
          >
            filter
          </I18n>
        </FilterFooter>
      </AccordionContainer>
    </FilterWrapper>
  )
}

export default React.memo(PageFilter)

PageFilter.propTypes = {
  Form: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  handleFilter: PropTypes.func.isRequired,
  filters: PropTypes.object
}

PageFilter.defaultProps = { filters: {} }
