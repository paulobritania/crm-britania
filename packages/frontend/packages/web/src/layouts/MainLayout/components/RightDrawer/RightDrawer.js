import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { useHistory } from 'react-router-dom'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FeedbackIcon from '@material-ui/icons/Feedback'
import ForumIcon from '@material-ui/icons/Forum'

import I18n, { useT } from '@britania-crm/i18n'
// import { selectHasAccessToMessageBoard } from '@britania-crm/stores/auth/auth.selectors'
import { sla as SlaRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { MessageActions } from '@britania-crm/stores/message'
import {
  getLastFiveMessage,
  getOneMessage,
  getAllFilterMessage
} from '@britania-crm/stores/message/message.selectors'
import { ProfilesActions } from '@britania-crm/stores/profiles'
import { getAllProfiles } from '@britania-crm/stores/profiles/profiles.selectors'
import colors from '@britania-crm/styles/colors'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import Button from '@britania-crm/web-components/Button'
import FilterMessage from '@britania-crm/web-components/FilterMessage/FilterMessage'
import {
  Shape,
  RightEar
} from '@britania-crm/web-components/Icons'
import InputSelect from '@britania-crm/web-components/InputSelect'
import LightTooltip from '@britania-crm/web-components/LightTooltip'
import Popup from '@britania-crm/web-components/Popup'
import PreviewMessageboard from '@britania-crm/web-components/PreviewMessageboard'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import useStyles, {
  Title,
  Container,
  SectionItem,
  SubTitle,
  ListPost,
  PostItem,
  Divider,
  Icons,
  GridContainer,
  ListSla,
  ItemSla,
  Content,
  StatusChatList,
  StatusChatItem,
  ItemChat,
  SubtitleText,
  Expiration,
  Workflow,
  ExpirationDate,
  WorkflowType,
  Company,
  TimeIndicator,
  CleanSlaFilter,
  FilterButton,
  SelectTheme
} from './styles'

const RightDrawer = ({ openRightDrawer, handleRightDrawerOpen }) => {
  const classes = useStyles()
  const history = useHistory()
  const { routes } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const t = useT()

  const [openPopup, setOpenPopup] = useState(false)
  const [openPopupFilter, setOpenPopupFilter] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElFilter, setAnchorElFilter] = useState(null)
  const [messageSelected, setMessageSelected] = useState({})
  const [optionSelected, setOptionSelected] = useState(0)
  const [slaFilter, setSlaFilter] = useState({
    orderBy: 'dueDate',
    sort: 'ASC',
    page: 1,
    pageSize: 5
  })

  const hasAccessToMessageBoard = true // useSelector(selectHasAccessToMessageBoard)
  const allMessages = useSelector(getLastFiveMessage)
  const profiles = useSelector(getAllProfiles)
  const oneMessage = useSelector(getOneMessage)
  const allFilterMessage = useSelector(getAllFilterMessage)

  const fetchMessage = useCallback((id) => {
    dispatch(MessageActions.getOneMessage(id))
  }, [dispatch])

  const indicatorColor = (color) => {
    switch (color) {
      case 'GREEN': return colors.success.main
      case 'YELLOW': return colors.warning.main
      default: return colors.error.main
    }
  }
  const workflowType = (type) => {
    switch (type) {
      case 'VPC': return 'VPC'
      case 'PCC': return 'Pré Cadastro de Cliente'
      case 'PCR': return 'Pré Cadastro de Representante'
      case 'AP': return 'Aprovação de Pedido'
      case 'ACdC': return 'Atualização de Cadastro de Cliente'
      case 'ARC': return 'Alteração de Ranking de Cliente'
      case 'EP': return 'Equalização de Preço'
      case 'APE': return 'Aprovação de Pedido de Equalização'
      case 'ACtC': return 'Alteração de Categoria do Cliente'
      case 'AN': return 'Aprovação de Negociação'
      default: return ''
    }
  }

  const slas = useCrmApi([SlaRoutes.getAll, slaFilter], { params: slaFilter }).data?.data
  const previewSlas = useCrmApi([SlaRoutes.getPreview]).data

  // executa a busca de recados de acordo com os filtros
  const fetchMessageFilter = useCallback((filter) => {
    dispatch(MessageActions.getFilteredMessages(filter))
  }, [dispatch])

  const messages = useMemo(() => !isEmpty(allFilterMessage) ? allFilterMessage : allMessages, [allFilterMessage, allMessages])

  // chama a função que busca os recados e passa o filtro com o perfil selecionado
  useEffect(() => {
    fetchMessageFilter({ profiles: optionSelected > 0 ? optionSelected : null })
  }, [fetchMessageFilter, optionSelected])

  useEffect(() => {
    setMessageSelected(oneMessage)
  }, [oneMessage])

  // Função para carregar a lista de recados no primeiro carregamento da tela
  useEffect(() => {
    dispatch(ProfilesActions.getAllProfiles())
  }, [dispatch])

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      className={ clsx(classes.drawer, {
        [classes.drawerOpen]: openRightDrawer,
        [classes.drawerClose]: !openRightDrawer
      }) }
      classes={ {
        paper: clsx(classes.switcher, {
          [classes.drawerOpen]: openRightDrawer,
          [classes.drawerClose]: !openRightDrawer
        })
      } }
    >

      <GridContainer>
        <div className={ classes.arrowRightIcon }>
          <IconButton onClick={ handleRightDrawerOpen } style={ { padding: 0 } }>
            <RightEar />
          </IconButton>
        </div>

        <Content>
          <SectionItem closeRighDrawer={ !openRightDrawer }>
            <Container closeRighDrawer={ !openRightDrawer }>
              <FeedbackIcon fontSize="inherit" htmlColor={ colors.britSupport2.base } />
              <Title>SLA</Title>
            </Container>

            <StatusChatList closeRighDrawer={ !openRightDrawer }>
              <StatusChatItem status="failed" onClick={ () => setSlaFilter({ ...slaFilter, expirationIndicator: 'RED' }) }>
                <FeedbackIcon fontSize="small" />
                <ItemChat>{previewSlas?.red || 0}</ItemChat>
              </StatusChatItem>

              <StatusChatItem onClick={ () => setSlaFilter({ ...slaFilter, expirationIndicator: 'YELLOW' }) }>
                <FeedbackIcon fontSize="small" />
                <ItemChat>{previewSlas?.yellow || 0}</ItemChat>
              </StatusChatItem>

              <StatusChatItem status="success" onClick={ () => setSlaFilter({ ...slaFilter, expirationIndicator: 'GREEN' }) }>
                <FeedbackIcon fontSize="small" />
                <ItemChat>{previewSlas?.green || 0}</ItemChat>
              </StatusChatItem>
            </StatusChatList>
            {openRightDrawer
              ? (
                <CleanSlaFilter onClick={ () => setSlaFilter({ ...slaFilter, expirationIndicator: null }) }>
                  <SubtitleText>Últimos SLAs</SubtitleText>
                  <ExpandMoreIcon htmlColor="#fff" fontSize="small" />
                </CleanSlaFilter>
              )
              : (
                <Divider />
              )}

            <ListSla closeRighDrawer={ !openRightDrawer }>
              {map(slas, (item) => openRightDrawer
                ? (
                  <ItemSla
                    status="success"
                    closeRighDrawer={ !openRightDrawer }
                    key={ item.workflowIdentifier }
                  >
                    <Expiration>
                      <AccessTimeIcon fontSize="small" htmlColor={ indicatorColor(item.expirationTime) } />
                      <ExpirationDate color={ indicatorColor(item.expirationTime) }>{formatBackDateToFriendlyFormat(item.dueDate)}</ExpirationDate>
                    </Expiration>

                    <Workflow>
                      <LightTooltip title={ workflowType(item.workflowTypeAlias) } arrow>
                        <WorkflowType>{item.workflowTypeAlias}</WorkflowType>
                      </LightTooltip>
                      <Company>{item.parentCompanyName}</Company>
                    </Workflow>
                  </ItemSla>
                )
                : (
                  <TimeIndicator key={ item.workflowIdentifier }>
                    <AccessTimeIcon fontSize="small" htmlColor={ indicatorColor(item.expirationTime) } />
                  </TimeIndicator>
                ))}
            </ListSla>
            {openRightDrawer &&
              <I18n
                as={ Button }
                color="warning"
                variant="contained"
                onClick={ () => history.push(routes.sla.path) }
                className={ classes.btn }
              >
            all slas
              </I18n> }
          </SectionItem>

          {hasAccessToMessageBoard && (
            <SectionItem closeRighDrawer={ !openRightDrawer }>
              <Container closeRighDrawer={ !openRightDrawer }>
                <ForumIcon fontSize="inherit" htmlColor={ colors.britSupport2.base }/>
                <I18n as={ Title } params={ { howMany: 2 } }>
                  {openRightDrawer ? 'message boards' : 'messages'}
                </I18n>

              </Container>
              {openRightDrawer
                ? (
                  <>
                    <SubTitle>
                      <InputSelect
                        detached
                        label={ t('last message') }
                        name="select-message"
                        options={ profiles }
                        onChange={ (event) => { setOptionSelected(event.target.value) } }
                        value={ optionSelected }
                        variant="standard"
                        theme={ SelectTheme }
                      />
                      <FilterButton>
                        <IconButton
                          aria-label="close" className={ classes.closeButton } onClick={ (event) => {
                            setAnchorElFilter(event.currentTarget)
                            setOpenPopupFilter(true)
                          } }
                        >
                          <Shape color={ colors.britSecondary.base } />
                        </IconButton>
                      </FilterButton>
                    </SubTitle>
                    <ListPost>
                      {map(messages, (item) => (
                        <PostItem
                          key={ item.id }
                        >
                          <div onClick={ (event) => {
                            setAnchorEl(event.currentTarget)
                            setOpenPopup(true)
                            fetchMessage(item.id)
                          } }
                          >
                            <span> {item.title}</span>
                          </div>
                          <div>
                            <span>{item.messageProfile[0]?.profile[0]?.name}</span>
                            <span>{formatBackDateToFriendlyFormat(item.expirationDate)} </span>
                          </div>
                        </PostItem>
                      ))}

                      {
                        !isEmpty(messageSelected) && (
                          <Popup
                            open={ openPopup }
                            anchorEl={ anchorEl }
                          >
                            <PreviewMessageboard
                              item={ messageSelected } handlePopoverClose={ () => {
                                setOpenPopup(false)
                                setAnchorEl(null)
                                setMessageSelected({})
                              } }
                            />
                          </Popup>
                        )}
                      <Popup
                        open={ openPopupFilter }
                        anchorEl={ anchorElFilter }
                      >
                        <FilterMessage
                          options={ profiles }
                          handlePopoverClose={ () => {
                            setOpenPopupFilter(false)
                            setAnchorElFilter(null)
                            setMessageSelected({})
                          } }
                        />
                      </Popup>
                    </ListPost>
                    <I18n
                      as={ Button }
                      color="warning"
                      variant="contained"
                      onClick={ () => history.push(routes.messageboard.path) }
                      className={ classes.btn }
                    >
                  all message board
                    </I18n>
                  </>
                )
                : (
                  <>
                    <Icons>
                      <div>
                        <ForumIcon fontSize="small" htmlColor={ colors.britPrimary2.lighter } />
                      </div>
                    </Icons>

                    <Divider style={ { marginTop: '10px' } } />
                  </>
                )}
            </SectionItem>
          )}
        </Content>

      </GridContainer>
    </Drawer>
  )
}

RightDrawer.propTypes = {
  openRightDrawer: PropTypes.bool.isRequired,
  handleRightDrawerOpen: PropTypes.func.isRequired
}

export default RightDrawer
