import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect
} from 'react'
import Flatpickr from 'react-flatpickr'

import flatpickr from 'flatpickr'
import { Portuguese } from 'flatpickr/dist/l10n/pt'
import MonthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import moment from 'moment/moment'
import PropTypes from 'prop-types'

import find from 'lodash/find'
import first from 'lodash/first'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import map from 'lodash/map'
import omitBy from 'lodash/omitBy'

import {
  dateBackFormat,
  dateTimeBackFormat,
  timeBackFormat,
  monthYearBackFormat
} from '@britania-crm/utils/date'

import useStyles from './styles'

if (typeof window !== 'undefined') {
  flatpickr.localize(Portuguese)
}

const CalendarPicker = (props) => {
  const {
    mode,
    minDate,
    maxDate,
    minTime,
    maxTime,
    disabledDates,
    options: externalOptions,
    onChange,
    children,
    value,
    styles,
    withoutInput,
    disabled
  } = props

  useStyles()

  const calendarRef = useRef(null)

  const relative = useMemo(() => !children, [children])

  const momentBack = useMemo(
    () => {
      switch (mode) {
        case 'time': return timeBackFormat
        case 'datetime': return dateTimeBackFormat
        case 'month': return monthYearBackFormat
        case 'date':
        default: return dateBackFormat
      }
    },
    [mode]
  )

  const dateFormat = useMemo(
    () => {
      switch (mode) {
        case 'time': return 'H:i'
        case 'datetime': return 'Y-m-d H:i'
        case 'month': return 'Y-m'
        case 'date':
        default: return 'Y-m-d'
      }
    },
    [mode]
  )

  const date = useMemo(
    () => {
      if (isArray(value)) {
        if (isEmpty(value)) {
          return []
        }
        const test = map(value, (val) => moment(val, momentBack, true))
        const isInvalid = !!find(test, (item) => !item.isValid())
        if (isInvalid) {
          return value
        }
        return map(test, (item) => item.format(momentBack))
      }

      if (isEmpty(value)) {
        return null
      }
      const test = moment(value, momentBack, true)
      if (test.isValid()) {
        return test.format(momentBack)
      }
      return value
    },
    [momentBack, value]
  )

  const removeInput = useMemo(
    () => withoutInput ? { display: 'none', ...styles } : styles,
    [styles, withoutInput]
  )

  const options = useMemo(
    () => {
      const plugins = []

      if (mode === 'month') {
        plugins.push(
          new MonthSelectPlugin({
            shorthand: false,
            dateFormat: 'Y-m-d',
            altFormat: 'm/Y'
          })
        )
      }

      return omitBy({
        ...externalOptions,
        disableMobile: true,
        inline: relative,
        static: relative,
        wrap: !relative,
        altInputClass: relative ? 'hide-flatpickr-native-input' : '',
        appendTo: relative ? undefined : document.getElementById('calendar-picker-portal'),
        dateFormat,
        minDate,
        maxDate,
        minTime,
        maxTime,
        disable: disabledDates,
        enableTime: mode === 'time' || mode === 'datetime',
        noCalendar: mode === 'time',
        allowInput: true,
        clickOpens: !relative && !disabled,
        plugins
      }, (item) => !isBoolean(item) && !isFunction(item) && isEmpty(item))
    },
    [mode, externalOptions, relative, dateFormat, minDate, maxDate, minTime, maxTime, disabledDates, disabled]
  )

  const handleChange = useCallback(
    ([...dates]) => {
      let values = map(dates, (newDate) => moment(newDate).format(momentBack))
      if (mode === 'date' && options.mode !== 'range') {
        values = first(values)
      }
      onChange(values)
    },
    [mode, options.mode, onChange, momentBack]
  )

  useEffect(
    () => {
      const momentDate = moment(date, dateBackFormat, true)
      const momentMinDate = moment(minDate, dateBackFormat, true)
      if (!disabled && minDate && calendarRef?.current) {
        if (momentDate.isAfter(momentMinDate)) {
          calendarRef.current.flatpickr.jumpToDate(date)
        } else {
          calendarRef.current.flatpickr.jumpToDate(minDate)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [minDate, date]
  )

  return (
    <Flatpickr
      ref={ calendarRef }
      style={ removeInput }
      value={ date }
      options={ options }
      onChange={ handleChange }
    >
      <div className="flatpickr">
        {children}
      </div>
    </Flatpickr>
  )
}

CalendarPicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'datetime', 'time', 'month']),
  minDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  options: PropTypes.object,
  children: PropTypes.any,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  withoutInput: PropTypes.bool,
  disabled: PropTypes.bool,
  styles: PropTypes.object
}

CalendarPicker.defaultProps = {
  mode: 'date',
  minDate: null,
  maxDate: null,
  minTime: null,
  maxTime: null,
  disabledDates: [],
  onChange () {},
  options: {},
  children: undefined,
  value: null,
  withoutInput: false,
  disabled: false,
  styles: {}
}

export default CalendarPicker
