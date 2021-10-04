import React, {
  useMemo,
  useState,
  useEffect,
  memo
} from 'react'

import moment from 'moment/moment'
import PropTypes from 'prop-types'

import { isObject } from 'lodash'
import isEqual from 'lodash/isEqual'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import { dateBackFormat } from '@britania-crm/utils/date'
import { areEqual } from '@britania-crm/utils/memo'
import InputDate from '@britania-crm/web-components/InputDate'

const InputDateRangeStyled = (props) => {
  const {
    value,
    onChange,
    min,
    max,
    labelFrom,
    labelTo,
    disabled,
    required,
    error
  } = props

  const t = useT()

  const [dateFrom, setDateFrom] = useState(value.from)
  const [dateTo, setDateTo] = useState(value.to)

  const generalError = useMemo(
    () => isObject(error) ? undefined : error,
    [error]
  )

  const inputsProps = useMemo(
    () => ({
      min,
      max,
      disabled,
      required
    }),
    [disabled, max, min, required]
  )

  const minDateTo = useMemo(() => {
    if (inputsProps.min && dateFrom) {
      const fromMoment = moment(dateFrom, dateBackFormat, true)
      const minMoment = moment(inputsProps.min, dateBackFormat, true)
      if (fromMoment.isValid() && fromMoment.isAfter(minMoment)) {
        return dateFrom
      }
    }
    return inputsProps.min
  }, [dateFrom, inputsProps.min])

  useEffect(
    () => {
      if (!isEqual(value, { from: dateFrom, to: dateTo })) {
        setDateFrom(value.from)
        setDateTo(value.to)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )

  useEffect(
    () => {
      const from = dateFrom
      let to = dateTo
      if (!isEqual(value, { from, to })) {
        if (from && to) {
          const fromMoment = moment(from, dateBackFormat, true)
          const toMoment = moment(to, dateBackFormat, true)
          if (
            toMoment.isValid() &&
            fromMoment.isValid() &&
            fromMoment.isAfter(toMoment)
          ) {
            to = ''
          }
        }
        onChange({ from, to })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dateFrom, dateTo]
  )
  return (
    <Grid container spacing={ 1 }>
      <Grid item xs={ 6 }>
        <InputDate
          detached
          name="from"
          label={ labelFrom || t('start date') }
          value={ dateFrom }
          onChange={ setDateFrom }
          error={ (!dateFrom && generalError) || error?.from }
          { ...inputsProps }
        />
      </Grid>
      <Grid item xs={ 6 }>
        <InputDate
          detached
          name="to"
          label={ labelTo || t('end date') }
          value={ dateTo }
          onChange={ setDateTo }
          error={ (!dateTo && generalError) || error?.to }
          { ...inputsProps }
          min={ minDateTo }
        />
      </Grid>
    </Grid>
  )
}

InputDateRangeStyled.propTypes = {
  value: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  }),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  minWidth: PropTypes.number,
  defaultValue: PropTypes.shape({
    to: PropTypes.string,
    from: PropTypes.string
  }),
  min: PropTypes.string,
  max: PropTypes.string,
  styles: PropTypes.object,
  labelFrom: PropTypes.string,
  labelTo: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

InputDateRangeStyled.defaultProps = {
  value: {
    from: '',
    to: ''
  },
  defaultValue: {
    from: '',
    to: ''
  },
  onChange () {},
  disabled: false,
  required: false,
  minWidth: 190,
  min: undefined,
  max: undefined,
  styles: {},
  labelFrom: null,
  labelTo: null,
  error: null
}

export default memo(InputDateRangeStyled, areEqual)
