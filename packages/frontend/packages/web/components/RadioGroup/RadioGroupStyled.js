import React, {
  forwardRef,
  useCallback,
  memo
} from 'react'

import PropTypes from 'prop-types'

import isBoolean from 'lodash/isBoolean'
import map from 'lodash/map'

import Box from '@material-ui/core/Box'
import FormHelperText from '@material-ui/core/FormHelperText'
import RadioGroup from '@material-ui/core/RadioGroup'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import InfoIcon from '@material-ui/icons/Info'

import { colors } from '@britania-crm/styles'
import { areEqual } from '@britania-crm/utils/memo'

import {
  Container,
  Label,
  FormControlLabelStyled,
  RadioStyled
} from './styles'

const RadioGroupStyled = forwardRef((props, fieldRef) => {
  const {
    label,
    value,
    options,
    onChange,
    clearable,
    idKey,
    valueKey,
    row,
    error,
    required,
    disabled,
    ...rest
  } = props

  const handleChange = useCallback((event) => {
    if (isBoolean(event.target.checked)) {
      let eventValue = event.target.value

      const booleanAsString = eventValue === 'true' || eventValue === 'false'
      if (booleanAsString) {
        eventValue = eventValue === 'true'
      }

      if (clearable && value === eventValue) {
        onChange({ ...event, target: { ...event.target, value: booleanAsString ? null : '' } })
      } else {
        onChange({ ...event, target: { ...event.target, value: eventValue } })
      }
    }
  }, [clearable, onChange, value])

  return (
    <Container>
      {label && <Label color={ error ? 'error' : undefined }>
        {label}{required ? <Label component="span" color="error"> *</Label> : ''}
      </Label>}
      <RadioGroup
        ref={ fieldRef }
        row={ row }
        value={ String(value) }
        onClick={ handleChange }
        { ...rest }
      >
        {map(options, (option) =>
          <FormControlLabelStyled
            value={ String(option[idKey]) }
            label={ option[valueKey] }
            key={ `option-${ option[idKey] }` }
            disabled={ disabled }
            control={ (
              <RadioStyled
                color="primary"
                icon={ <Brightness1Icon htmlColor={ colors.grey4 } /> }
                checkedIcon={ <CircleCheckedFilled htmlColor={ colors.primary.main } /> }
              />
            ) }
          />
        ) }
      </RadioGroup>
      {!!error && (
        <div style={ { marginBottom: 10 } }>
          <FormHelperText error>
            <Box style={ { color: colors.error.main } } component="span" display="flex" alignItems="center">
              <InfoIcon fontSize="small" style={ { marginRight: '8px' } } />
              {' '}{ error }
            </Box>
          </FormHelperText>
        </div>
      )}
    </Container>
  )
})

RadioGroupStyled.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  row: PropTypes.bool,
  clearable: PropTypes.bool,
  onChange: PropTypes.func,
  idKey: PropTypes.string,
  valueKey: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

RadioGroupStyled.defaultProps = {
  label: null,
  value: false,
  options: [],
  row: true,
  clearable: false,
  onChange () {},
  idKey: 'id',
  valueKey: 'name',
  error: null,
  required: false,
  disabled: false
}

export default memo(RadioGroupStyled, areEqual)
