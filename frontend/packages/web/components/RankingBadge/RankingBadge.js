import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import { useT } from '@britania-crm/i18n'

import {
  Container,
  Star
} from './styles'

const RankingBadge = ({ type }) => {
  const t = useT()

  const rankings = useMemo(() => [
    { name: t('bronze'), color: '#EA9E5B' },
    { name: t('silver'), color: '#CED4DA' },
    { name: t('gold'), color: '#FFDD64' },
    { name: t('diamond'), color: '#94D8FF' }
  ], [t])

  const ranking = useMemo(() => {
    if (type === 'SILVER') {
      return rankings[1]
    } else if (type === 'GOLD') {
      return rankings[2]
    } else if (type === 'DIAMOND') {
      return rankings[3]
    }
    return rankings[0]
  }, [rankings, type])

  const color = ranking?.color || ''
  const name = ranking?.name || ''

  return (
    <Container>
      <Star iconcolor={ color } /> { name }
    </Container>
  )
}

RankingBadge.propTypes = { type: PropTypes.string }

RankingBadge.defaultProps = { type: 'BRONZE' }

export default RankingBadge
