import React, {
  // useCallback,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'

import * as Inputs from './Inputs'

const DynamicInput = ({
  input, rules, ...props
}) => {
  const Input = useMemo(
    () => Inputs[input] || Inputs.text,
    [input]
  )

  const additionalProps = useMemo(
    () => reduce(
      rules,
      (acc, rule) => {
        let configs = {}
        if (isArray(rule)) {
          [, configs = {}] = rule
        }
        return {
          ...acc,
          ...configs
        }
      },
      {}
    ),
    [rules]
  )

  return (
    <Input { ...props } { ...additionalProps } />
  )
}

DynamicInput.propTypes = {
  input: PropTypes.string.isRequired,
  rules: PropTypes.array
}

DynamicInput.defaultProps = { rules: [] }

export default DynamicInput
