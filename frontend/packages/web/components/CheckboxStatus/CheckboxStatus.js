import React, {
  useEffect,
  useCallback,
  useState,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import { useT } from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'

import Checkbox from '../Checkbox'
import {
  Container,
  Label
} from './styles'

const CheckboxStatus = (props) => {
  const {
    activeColor,
    inactiveColor,
    activeStatus,
    inactiveStatus,
    value,
    onValueChange,
    label,
    notFistLabel,
    ...rest
  } = props

  const { detached } = rest

  const t = useT()

  const [currentValue, setCurrentValue] = useState(detached ? value : undefined)

  const checkboxLabel = useMemo(
    () => {
      const firstStr = t(currentValue ? 'active' : 'inactive')
      const secondStr = currentValue ? activeStatus : inactiveStatus
      if (notFistLabel) {
        return secondStr || firstStr
      }
      return `${ firstStr }${ secondStr ? ` - ${ secondStr }` : '' }`
    },
    [activeStatus, currentValue, inactiveStatus, notFistLabel, t]
  )

  const handleValueChange = useCallback(
    (value, fieldMounted) => {
      setCurrentValue(value)
      onValueChange(value, fieldMounted)
    },
    [onValueChange]
  )

  useEffect(
    () => {
      if (detached) {
        setCurrentValue(value)
      }
    },
    [detached, value]
  )

  if (!detached) {
    rest.onValueChange = handleValueChange
  }

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Checkbox
        { ...rest }
        value={ value }
        label={ checkboxLabel }
        icon={ <FiberManualRecordIcon fontSize="small" htmlColor={ inactiveColor } /> }
        checkedIcon={ <FiberManualRecordIcon fontSize="small" htmlColor={ activeColor } /> }
      />
    </Container>
  )
}

CheckboxStatus.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  activeStatus: PropTypes.string,
  inactiveStatus: PropTypes.string,
  onValueChange: PropTypes.func,
  notFistLabel: PropTypes.bool
}

CheckboxStatus.defaultProps = {
  value: false,
  activeColor: colors.success.main,
  inactiveColor: colors.error.main,
  activeStatus: null,
  label: null,
  inactiveStatus: null,
  onValueChange () {},
  notFistLabel: false
}

export default CheckboxStatus
