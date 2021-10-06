import React, {
  useEffect,
  useCallback,
  useMemo,
  useState
} from 'react'

import PropTypes from 'prop-types'

import get from 'lodash/get'

import {
  MIN_VALUE,
  MAX_VALUE
} from '@britania-crm/constants/customerRanking.constants'
import { isPercentageValid } from '@britania-crm/utils'

import * as INDICATORS from '../../constants/table'
import { Input } from './styles'

const getParentCategory = (id = '') => id.split('_')[0]

const EditableCellNumber = ({ prop }) => {
  const {
    value: initialValue,
    row,
    row: { index },
    column,
    column: { id },
    updateMyData,
    columnEditable
  } = prop

  const [value, setValue] = useState(initialValue)
  const [lastValidValue, setLastValidValue] = useState(initialValue)

  const category = useMemo(
    () => getParentCategory(prop.cell.column.id),
    [prop.cell.column.id]
  )

  const preSymbol = useMemo(
    () => (column.headerId !== INDICATORS.WEIGHT) && get(row, `values.${ category }_SYMBOL`),
    [category, column.headerId, row]
  )

  const posSymbol = useMemo(
    () => (column.headerId !== INDICATORS.WEIGHT) && '%',
    [column.headerId]
  )

  const onChange = useCallback(
    (e) => {
      if (isPercentageValid(Number(e.target.value))) {
        const val = Number(e.target.value)
        setValue(val)
        setLastValidValue(val)
      }
    },
    []
  )

  const onBlur = useCallback(
    (e) => {
      const val = Number(e.target.value)

      if (!isPercentageValid(val, 0, 100)) {
        setValue(lastValidValue)
      } else {
        updateMyData(index, id, val)
      }
    },
    [id, index, lastValidValue, updateMyData]
  )

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div style={ {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    } }
    >
      { preSymbol }
      <Input
        type="number"
        min={ MIN_VALUE }
        max={ MAX_VALUE }
        disabled={ columnEditable !== column.parent.id }
        value={ value }
        onChange={ onChange }
        onBlur={ onBlur }
      />
      { posSymbol }
    </div>
  )
}

EditableCellNumber.propTypes = { prop: PropTypes.object.isRequired }

export default EditableCellNumber
