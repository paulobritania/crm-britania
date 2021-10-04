import { makeStyles } from '@material-ui/core/styles'

import {
  colors,
  hexToRgba
} from '@britania-crm/styles'

import 'flatpickr/dist/themes/material_green.css'
import 'flatpickr/dist/plugins/monthSelect/style.css'

const useStyles = makeStyles(() => ({
  '@global': {
    '.flatpickr-month,.flatpickr-weekdays,.flatpickr-monthDropdown-month,.flatpickr-weekday,.flatpickr-monthDropdown-months,.selected,.flatpickr-day.startRange,.flatpickr-day.endRange': { backgroundColor: `${ colors.primary.main }!important` },

    '.selected,.flatpickr-day.startRange,.flatpickr-day.endRange': {
      background: `${ colors.primary.main }!important`,
      borderColor: `${ colors.primary.main }!important`,
      color: `${ colors.white } !important`
    },

    '.flatpickr-day.inRange': {
      boxShadow: `-5px 0 0 ${ colors.primary.main }, 5px 0 0 ${ colors.primary.main } !important`,
      background: `${ colors.primary.main }!important`,
      borderColor: `${ colors.primary.main }!important`,
      color: `${ colors.white } !important`
    },

    '.flatpickr-weekday': {
      color: `${ colors.white }!important`,
      textShadow: `0 0 2px ${ hexToRgba(colors.text, 0.2) }`
    },

    'span.flatpickr-weekday': { whiteSpace: 'normal' },

    '.hide-flatpickr-native-input': { display: 'none' },

    '.flatpickr-month, .flatpickr-prev-month, .flatpickr-next-month': {
      fill: `${ colors.white }!important`,
      color: `${ colors.white }!important`,
      textShadow: `0 0 2px ${ hexToRgba(colors.text, 0.2) }`
    },

    '.flatpickr-calendar.arrowTop:after': { borderBottomColor: `${ colors.primary.main }!important` },

    '.flatpickr-calendar.arrowBottom:after': { borderTopColor: `${ colors.white }!important` },
    '.flatpickr-monthSelect-theme-light': { '& .flatpickr-next-month, & .flatpickr-prev-month': { display: 'none' } },
    '.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1))': { boxShadow: `-10px 0 0 ${ colors.primary.main }` },

    '.flatpickr-day': { lineHeight: '36px !important' }
  }
}))

export default useStyles
