import React, {
  memo,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import StarIcon from '@material-ui/icons/Star'

import { useT } from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'
import LightTooltip from '@britania-crm/web-components/LightTooltip'

import {
  Container,
  ContainerTitle
} from './styles'

const HeaderItem = ({
  children,
  startColor,
  data
}) => {
  const t = useT()

  const handleClick = useCallback(() => data.handleColumnEditable(data?.column?.originalId), [data])

  return (
    <Container>
      <StarIcon
        style={ { color: startColor } }
      />
      <ContainerTitle >{ children }</ContainerTitle>
      <LightTooltip title={ t('datagrid body edit tooltip') } arrow>
        <CreateOutlinedIcon
          onClick={ handleClick }
          style={ { color: colors.britSupport1.light } }
        />
      </LightTooltip>

    </Container>
  )
}

export default memo(HeaderItem)

HeaderItem.propTypes = {
  data: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  startColor: PropTypes.string.isRequired
}
