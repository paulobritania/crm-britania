import React from 'react'

import PropTypes from 'prop-types'

import {
  TextContainer,
  Container,
  RightColumn,
  LeftColumn
} from '../styles'
import WorkflowActionButtons from '../WorkflowActionButtons'

const ResponseCard = ({
  node, onAddOrEditTask, deleteNode, readOnly
}) => (
  <Container>
    <RightColumn>
      <TextContainer>{node.title}</TextContainer>
    </RightColumn>
    <LeftColumn>
      {!readOnly &&
          <WorkflowActionButtons
            node={ node }
            onEdit={ onAddOrEditTask }
            onDelete={ deleteNode }
          />
      }
    </LeftColumn>
  </Container>
)

ResponseCard.propTypes = {
  node: PropTypes.object.isRequired,
  onAddOrEditTask: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired
}

export default ResponseCard
