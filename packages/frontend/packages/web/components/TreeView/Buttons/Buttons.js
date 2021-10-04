import React, {
  useEffect,
  useState
} from 'react'

import I18n from '@meta-react/i18n'
import PropTypes from 'prop-types'

import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import AddIcon from '@material-ui/icons/Add'

import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'
import {
  ConditionIcon,
  ResponseIcon
} from '@britania-crm/web-components/Icons'

import {
  Container,
  NoTasksText,
  TaskButtonContainer
} from './styles'

const Buttons = ({
  id, onAddNewConditionOrResponse, isTaskView, onAddTask, amountOfTasks
}) => {
  const [height, setHeight] = useState()

  useEffect(() => {
    const callback = (mutations) => {
      if (!mutations || isEmpty(mutations)) return

      if (height >= 480) return

      const className = 'ReactVirtualized__Grid__innerScrollContainer'

      const node = find(mutations, (mutation) => mutation?.target?.classList?.contains(className))
      if (node) return setHeight(node?.target?.clientHeight)

      const parentNode = find(mutations, (mutation) => mutation?.target?.firstChild?.classList?.contains(className))
      if (!parentNode) return

      const treeViewContainer = parentNode?.target?.firstChild
      setHeight(treeViewContainer?.clientHeight)
    }

    const targetNode = document.getElementById(id)

    const config = {
      attributes: true,
      subtree: true
    }

    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)

    return () => observer.disconnect()
  }, [height, id])

  useEffect(() => {
    if (height > 480) setHeight(480)
  }, [height])

  return (
    <Container top={ height } hasTasks={ amountOfTasks !== 0 }>
      { !isTaskView ? (
        <>
          <Button
            startIcon={ <ConditionIcon color={ colors.white } /> }
            style={ { background: colors.orange.base } }
            onClick={ onAddNewConditionOrResponse('condition') }
          >
            <I18n>add conditional</I18n>
          </Button>
          <Button
            startIcon={ <ResponseIcon color={ colors.white } /> }
            style={ { background: colors.lightBlue } }
            onClick={ onAddNewConditionOrResponse('response') }
          >
            <I18n>add response</I18n>
          </Button>
        </>
      ) : (
        <TaskButtonContainer hasTasks={ amountOfTasks !== 0 }>
          {amountOfTasks === 0 && <I18n as={ NoTasksText }>no tasks added yet</I18n>}
          <Button
            startIcon={ <AddIcon /> }
            style={ { background: colors.britSecondary.base } }
            onClick={ () => onAddTask() }
          >
            <I18n>add task</I18n>
          </Button>
        </TaskButtonContainer>
      )}
    </Container>
  )
}

Buttons.propTypes = {
  id: PropTypes.string.isRequired,
  onAddNewConditionOrResponse: PropTypes.func.isRequired,
  isTaskView: PropTypes.bool,
  onAddTask: PropTypes.func,
  amountOfTasks: PropTypes.number.isRequired
}

Buttons.defaultProps = { isTaskView: false, onAddTask () {} }

export default Buttons
