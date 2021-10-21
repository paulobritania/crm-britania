import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

// import Select from '@material-ui/core/Select'
import AppBar from '@material-ui/core/AppBar'
// import FormControl from '@material-ui/core/FormControl'
// import IconButton from '@material-ui/core/IconButton'
// import InputBase from '@material-ui/core/InputBase'
import Toolbar from '@material-ui/core/Toolbar'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import GroupIcon from '@material-ui/icons/GroupWork'
import HomeIcon from '@material-ui/icons/Home'
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import SearchIcon from '@material-ui/icons/Search'
// import StarIcon from '@material-ui/icons/Star'

import { selectUser } from '@britania-crm/stores/auth/auth.selectors'
import { formatPathToCloudStorageUrl } from '@britania-crm/utils/files'
import Avatar from '@britania-crm/web-components/Avatar'
import Popover from '@britania-crm/web-components/Popover'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import {
  useStyles,
  Container,
  HomeButton,
  // Info,
  Profile
} from './styles'
import UserMenu from './UserMenu'

// const ContextIcon = () => <GroupIcon color="primary" />

const MenuNavbar = ({
  openLeftDrawer,
  drawerWidth,
  memorizedValue
}) => {
  const classes = useStyles()
  const { routes } = useRoutes()

  const { username, file } = useSelector(selectUser)

  // const [, setFilter] = useState({
  //   description: '',
  //   start: '',
  //   end: ''
  // })

  // const handleField = useCallback(
  //   (event) => {
  //     const { value: description } = event.target
  //     setFilter((filters) => ({ ...filters, description }))
  //   },
  //   []
  // )

  // const handleTypeSearch = value => setTypeSearch(value)

  // const submit = useCallback(
  //   () => {
  //     //
  //   },
  //   []
  // )

  return (
    <AppBar
      position="fixed"
      style={ {
        border: 0,
        backgroundColor: 'white',
        width: `calc(100vw - ${ memorizedValue }px)`,
        left: openLeftDrawer ? `${ drawerWidth }px` : '73px',
        zIndex: 1200
      } }
      className={ classes.appBarShift }
    >
      <Toolbar style={ { paddingLeft: 10 } }>
        <Link to={ routes.home.path }>
          <HomeButton>
            <HomeIcon />
          </HomeButton>
        </Link>

        {/*
        <FormControl className={ classes.customSelect }>
          <ContextIcon />

          <Select
            onChange={ () => {
              // handleTypeSearch(e.target.value)
              // dispatch(pageAction.setSearchType(e.target.value))
            } }
            native
            classes={ {
              root: classes.grayColor,
              icon: classes.grayColor
            } }
          >
            <option value="all">Todos</option>
          </Select>
        </FormControl> */}

        {/* <div className={ classes.search }>
          <div className={ classes.searchBox }>
            <IconButton className={ classes.searchIcon } onClick={ submit }>
              <SearchIcon />
            </IconButton>
            <InputBase
              spellCheck
              placeholder="Faça sua busca aqui"
              classes={ {
                root: classes.inputRoot,
                input: classes.inputInput
              } }
              inputProps={ { 'aria-label': 'search' } }
              onChange={ handleField }
              onKeyPress={ submit }
            />
          </div>
        </div> */}

        <Container>
          {/* <Info>
            <StarIcon />
            <div>
              <NotificationsIcon />
              <div />
            </div>
          </Info> */}

          <Popover
            popoverId="user-menu"
            Component={ (p) => (
              <Profile { ...p }>
                <span>Olá, <strong>{username}</strong></span>
                <ExpandMoreIcon />
                <Avatar
                  src={ formatPathToCloudStorageUrl(file?.path) }
                />
              </Profile>
            ) }
          >
            <UserMenu />
          </Popover>

        </Container>
      </Toolbar>
    </AppBar>
  )
}

MenuNavbar.propTypes = {
  openLeftDrawer: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  memorizedValue: PropTypes.number.isRequired
}

export default MenuNavbar
