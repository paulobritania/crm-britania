import React, { memo } from 'react'

import PropTypes from 'prop-types'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { useT } from '@britania-crm/i18n'
import { formatBackDateTimeToFriendlyFormat } from '@britania-crm/utils/date'

import {
  Container,
  TableCellTitles,
  TableCellValues,
  MainTitle
} from './styles'

const LastChangeInfo = ({
  user,
  date
}) => {
  const t = useT()

  if (!user) return null

  return (
    <Container>
      <MainTitle variant="h4">{t('last change')}</MainTitle>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCellTitles align="left">{t('user', { howMany: 1 })}</TableCellTitles>
            <TableCellTitles align="left">{t('date and hour')}</TableCellTitles>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCellValues align="left">{user}</TableCellValues>
            <TableCellValues align="left">{!date ? '' : formatBackDateTimeToFriendlyFormat(date)}</TableCellValues>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  )
}

LastChangeInfo.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string
}

LastChangeInfo.defaultProps = {
  user: '',
  date: ''
}

export default memo(LastChangeInfo)
