
import React, {
  useMemo,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import find from 'lodash/find'

import TextArea from '@britania-crm/web-components/TextArea'

const JustificationEditComponent = ({
  value,
  onChange,
  rowData: {
    workflowTaskResponseId, responses, isReadOnly
  },
  error,
  helperText
}) => {
  const requiresJustification = useMemo(
    () => {
      const currentResponse = find(responses, { id: workflowTaskResponseId })
      return currentResponse?.requiresJustification
    },
    [workflowTaskResponseId, responses]
  )

  useEffect(
    () => {
      if (!requiresJustification) {
        onChange(null)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requiresJustification]
  )

  return (
    <TextArea
      detached
      name="justification"
      value={ value || '' }
      onChange={ (e) => onChange(e.target.value) }
      disabled={ isReadOnly }
      error={ (!!requiresJustification && error) ? helperText : undefined }
      style={ { marginBottom: 0 } }
      rows={ 2 }
    />
  )
}

JustificationEditComponent.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  rowData: PropTypes.shape({
    workflowTaskResponseId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    responses: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
    isReadOnly: PropTypes.bool
  }).isRequired

}

JustificationEditComponent.defaultProps = {
  onChange () {},
  value: '',
  helperText: ''
}

export default JustificationEditComponent
