import React, {
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import isNumber from 'lodash/isNumber'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import Checkbox from '@britania-crm/web-components/Checkbox'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

import DeleteButton from '../DeleteButton'
import {
  Container,
  RadioContainer
} from '../styles'

const ResponseCard = ({
  onPropChange,
  treeIndex,
  items,
  readOnly,
  deleteNode,
  allTasks,
  task
}) => {
  const t = useT()

  const currentNodeState = useMemo(() => items[treeIndex], [items, treeIndex])

  const [finishWorkflowValue, setFinishWorkflowValue] = useState('')

  const options = useMemo(() => [
    {
      id: 'finishWorkflowWithError',
      name: t('end with error')
    },
    {
      id: 'finishWorkflowSuccessfully',
      name: t('end with success')
    }
  ], [t])

  const nextTaskOptions = useMemo(
    () => {
      const otherTasks = filter(allTasks, (item) => item.id !== task.id)
      return map(otherTasks, (item) => ({
        id: item.id,
        name: item.title
      }))
    },
    [allTasks, task]
  )

  const nextTaskOrder = useMemo(
    () => {
      if (isNumber(currentNodeState.nextTaskOrder)) {
        return allTasks?.[currentNodeState.nextTaskOrder - 1]?.id
      }
      return currentNodeState.nextTaskOrder || ''
    },
    [currentNodeState.nextTaskOrder, allTasks]
  )

  useEffect(() => {
    if (currentNodeState.finishWorkflowWithError) {
      setFinishWorkflowValue('finishWorkflowWithError')
    } else if (currentNodeState.finishWorkflowSuccessfully) {
      setFinishWorkflowValue('finishWorkflowSuccessfully')
    } else {
      setFinishWorkflowValue('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeFinishWorkflowValue = useCallback((event) => {
    const [finishWorkflowWithError, finishWorkflowSuccessfully] = options
    if (event.target.value === finishWorkflowWithError.value) {
      onPropChange('finishWorkflowWithError', treeIndex)(true)
      onPropChange('finishWorkflowSuccessfully', treeIndex)(false)
    } else if (event.target.value === finishWorkflowSuccessfully.value) {
      onPropChange('finishWorkflowSuccessfully', treeIndex)(true)
      onPropChange('finishWorkflowWithError', treeIndex)(false)
    } else {
      onPropChange('finishWorkflowWithError', treeIndex)(false)
      onPropChange('finishWorkflowSuccessfully', treeIndex)(false)
    }
    setFinishWorkflowValue(event.target.value)
  }, [onPropChange, options, treeIndex])

  return (
    <>
      <Container>

        <Grid container spacing={ 1 } alignItems="center">

          <Grid item sm={ 12 } md={ 6 }>
            <InputText
              detached
              onChange={ onPropChange('title', treeIndex) }
              name="title"
              label={ t('response name') }
              value={ currentNodeState.title }
              required
              readOnly={ readOnly }
            />
          </Grid>

          <Grid item sm={ 12 } md={ 3 }>
            <InputSelect
              detached
              disabled={ !!finishWorkflowValue }
              onChange={ onPropChange('nextTaskOrder', treeIndex) }
              name="nextTask"
              label={ t('next task') }
              value={ nextTaskOrder }
              options={ nextTaskOptions }
              readOnly={ readOnly }
              clearable
            />
          </Grid>

          <Grid item sm={ 12 } md={ 3 } style={ { display: 'flex', alignItems: 'center' } }>
            <Checkbox
              detached
              onClick={ onPropChange('requiresJustification', treeIndex, 'checked') }
              name="requiresJustification"
              label={ t('demands justification') }
              value={ currentNodeState.requiresJustification }
              readOnly={ readOnly }
            />
            {!readOnly && (
              <DeleteButton node={ currentNodeState } onDelete={ deleteNode }/>
            )}
          </Grid>

        </Grid>
      </Container>

      <RadioContainer>
        <RadioGroup
          detached
          clearable
          name="finishWorkflowValue"
          value={ finishWorkflowValue }
          onChange={ handleChangeFinishWorkflowValue }
          options={ options }
        />
      </RadioContainer>
    </>
  )
}

ResponseCard.propTypes = {
  onPropChange: PropTypes.func.isRequired,
  treeIndex: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  readOnly: PropTypes.bool.isRequired,
  deleteNode: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  allTasks: PropTypes.array.isRequired
}

export default ResponseCard
