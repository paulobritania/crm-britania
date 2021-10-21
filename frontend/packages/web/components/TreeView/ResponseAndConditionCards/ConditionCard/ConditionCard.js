import React, {
  useCallback,
  useState,
  useMemo,
  useEffect
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'

import PropTypes from 'prop-types'

import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import { getAllAccesses } from '@britania-crm/stores/access/access.selectors'
import { FieldActions } from '@britania-crm/stores/field'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'

import DeleteButton from '../DeleteButton'
import { Container } from '../styles'
import { conditions } from '../utils'

const ConditionCard = ({
  onPropChange, treeIndex, readOnly, items, deleteNode
}) => {
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(false)
  const t = useT()

  const currentNodeState = useMemo(() => items[treeIndex], [items, treeIndex])

  const dispatch = useCallback(useDispatch(), [])

  const accesses = useSelector(getAllAccesses)

  useEffect(() => {
    if (currentNodeState.accessId) {
      setLoading(true)
      dispatch(FieldActions.getFields(currentNodeState.accessId, setFields, setLoading))
    }
  }, [currentNodeState.accessId, dispatch, onPropChange, treeIndex])

  useEffect(() => {
    if (currentNodeState.fieldId) {
      const eventMock = { target: { value: currentNodeState.fieldId } }

      onPropChange('fieldId', treeIndex)(eventMock)
    }
  }, [fields, currentNodeState.fieldId, onPropChange, treeIndex])

  const setAccess = ({ target: { value } }) => {
    const item = find(accesses, (access) => access.id === value)

    onPropChange('access', treeIndex)({ name: item?.name, id: value })
    onPropChange('accessId', treeIndex)(value)
  }

  const setField = ({ target: { value } }) => {
    const item = find(fields, (field) => field.id === value)

    onPropChange('field', treeIndex)({ name: item?.name, id: value })
    onPropChange('fieldId', treeIndex)(value)
  }

  return (
    <Container style={ { marginTop: 5 } }>
      <Grid container spacing={ 1 }>
        <Grid item sm={ 12 } md={ 3 }>
          <InputText
            detached
            onChange={ onPropChange('title', treeIndex) }
            name="title"
            label={ t('conditional name') }
            value={ currentNodeState.title }
            required
            variant="outlined"
            readOnly={ readOnly }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 2 }>
          <InputSelect
            detached
            margin="none"
            id="access"
            name="access"
            label={ t('form') }
            onChange={ setAccess }
            value={ currentNodeState.accessId || '' }
            disabled={ readOnly }
            options={ accesses }
            required
            valueKey="description"
          />
        </Grid>

        <Grid item sm={ 12 } md={ 2 }>
          <InputSelect
            detached
            // margin="none"
            id="field"
            name="field"
            label={ t('field', { howMany: 1 }) }
            onChange={ setField }
            value={ currentNodeState.fieldId || '' }
            disabled={ readOnly || isNil(currentNodeState.accessId) || isEmpty(fields) }
            options={ fields }
            required
            loading={ loading }
          />
        </Grid>

        <Grid item sm={ 12 } md={ 2 }>
          <InputSelect
            detached
            disabled={ readOnly }
            value={ currentNodeState.comparisonSymbol || '' }
            onChange={ onPropChange('comparisonSymbol', treeIndex) }
            name="condition"
            label={ t('condition') }
            id="condition"
            required={ true }
            options={ conditions }
            idKey="symbol"
            valueKey="name"
          />
        </Grid>

        <Grid item sm={ 12 } md={ 3 } style={ { display: 'flex', alignItems: 'center' } }>
          <InputText
            detached
            readOnly={ readOnly }
            onChange={ onPropChange('comparisonValue', treeIndex) }
            name="comparisonValue"
            label={ t('value') }
            value={ currentNodeState.comparisonValue }
            required
            variant="outlined"
          />
          {!readOnly && (
            <DeleteButton
              node={ currentNodeState }
              onDelete={ deleteNode }
            />
          )}
        </Grid>

      </Grid>
    </Container>
  )
}

ConditionCard.propTypes = {
  onPropChange: PropTypes.func.isRequired,
  treeIndex: PropTypes.number.isRequired,
  readOnly: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  deleteNode: PropTypes.func.isRequired
}

export default ConditionCard
