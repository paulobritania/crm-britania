import React from 'react'

import SearchIcon from '@material-ui/icons/Search'

import { useT } from '@britania-crm/i18n'

import IconButton from '../IconButton'

const SearchIconButton = (props) => {
  const t = useT()

  return (
    <IconButton tooltip={ t('search') } { ...props }>
      <SearchIcon />
    </IconButton>
  )
}

export default SearchIconButton
