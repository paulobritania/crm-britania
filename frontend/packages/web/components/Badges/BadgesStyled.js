import React, {
  useCallback,
  forwardRef,
  memo
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import map from 'lodash/map'

import { areEqual } from '@britania-crm/utils/memo'

import {
  Container,
  BadgeOptions,
  Badge,
  Label
} from './styles'

const Badges = forwardRef(({
  options,
  value,
  onChange,
  label
}, fieldRef) => {
  const handleCheckOption = useCallback(
    (currentOption) => {
      let changedValue
      const isSelectedOption = !!find(value, { id: currentOption.id })

      if (isSelectedOption) {
        changedValue = filter(value, (option) => option.id !== currentOption.id)
      } else {
        changedValue = [...value, { ...currentOption }]
      }

      onChange(changedValue)
    },
    [onChange, value]
  )

  return (
    <Container ref={ fieldRef }>
      {label && <Label>{label}</Label>}
      <BadgeOptions>
        {map(options, (option) => (
          <Badge
            key={ String(option.id) }
            selected={ find(value, { id: option.id }) }
            onClick={ () => handleCheckOption(option) }
          >
            {option.name}
          </Badge>
        ))}
      </BadgeOptions>
    </Container>
  )
})

Badges.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array
}

Badges.defaultProps = {
  value: [],
  onChange () {},
  label: null,
  options: []
}

export default memo(Badges, areEqual)
