import React from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import { colors } from '@britania-crm/styles'

import {
  Container,
  List
} from './styles'

const AssociatedDataList = ({
  value,
  label,
  width,
  error,
  idKey,
  valueKey,
  required
}) => (
  <Container width={ width } error={ error }>
    <label>
      {label}
      {required && (
        <span style={ {
          color: colors.error.main,
          fontSize: 12
        } }
        >
          {' '}*
        </span>
      )}
    </label>

    {isEmpty(value)
      ? <p>Ainda não foram vinculados nenhum dos perfis</p>
      : (
        <List>
          {map(value, (item) =>
            <span key={ item[idKey] }>{item[valueKey]}</span>
          )}
        </List>
      )}
  </Container>
)

AssociatedDataList.propTypes = {
  value: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  width: PropTypes.number,
  error: PropTypes.string,
  valueKey: PropTypes.string,
  idKey: PropTypes.string
}

AssociatedDataList.defaultProps = {
  width: undefined,
  error: null,
  valueKey: 'name',
  idKey: 'id',
  required: false
}

export default AssociatedDataList
