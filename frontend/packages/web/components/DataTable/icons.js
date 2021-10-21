/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'

import Add from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Link from '@material-ui/icons/Link'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Remove from '@material-ui/icons/Remove'
import Replay from '@material-ui/icons/Replay'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

import colors from '@britania-crm/styles/colors'
import CustonRedirect from '@britania-crm/web-components/Icons/CustonRedirectIcon'
import DeleteIconSVG from '@britania-crm/web-components/Icons/DeleteIcon'
import DownloadIcon from '@britania-crm/web-components/Icons/DownloadIcon'
import EditIconSVG from '@britania-crm/web-components/Icons/EditIcon'
import FilterIcon from '@britania-crm/web-components/Icons/FilterIcon'
import LinkIconSVG from '@britania-crm/web-components/Icons/LinkIcon'
import ViewIconSVG from '@britania-crm/web-components/Icons/ViewIcon'

export default {
  Attach: forwardRef((props, ref) => <Link { ...props } ref={ ref } />),
  Add: forwardRef((props, ref) => <Add { ...props } ref={ ref } />),
  Check: forwardRef((props, ref) => <Check { ...props } ref={ ref } />),
  Clear: forwardRef((props, ref) => <Clear { ...props } ref={ ref } />),
  Delete: forwardRef((props, ref) => <DeleteIconSVG { ...props } color={ colors.secondary.main } colorHover={ colors.error.main } ref={ ref } />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight { ...props } ref={ ref } />),
  Edit: forwardRef((props, ref) => <EditIconSVG { ...props } color={ colors.secondary.main } colorHover={ colors.info.main } ref={ ref } />),
  Menu: forwardRef((props, ref) => <MoreVertIcon style={ { fontSize: 18 } } { ...props } ref={ ref } />),
  Export: forwardRef((props, ref) => <SaveAlt { ...props } ref={ ref } />),
  Filter: forwardRef((props, ref) => <FilterList { ...props } ref={ ref } />),
  FilterIcon: forwardRef((props, ref) => <FilterIcon { ...props } ref={ ref } />),
  LinkIcon: forwardRef((props, ref) => <LinkIconSVG { ...props } color={ colors.secondary.main } colorHover={ colors.care.main } ref={ ref } />),
  FirstPage: forwardRef((props, ref) => <FirstPage { ...props } ref={ ref } />),
  LastPage: forwardRef((props, ref) => <LastPage { ...props } ref={ ref } />),
  NextPage: forwardRef((props, ref) => <ChevronRight { ...props } ref={ ref } />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft { ...props } ref={ ref } />),
  AccessRow: forwardRef((props, ref) => <ViewIconSVG { ...props } color={ colors.secondary.main } colorHover={ colors.success.main } ref={ ref } />),
  ResetSearch: forwardRef((props, ref) => <Clear { ...props } ref={ ref } />),
  Search: forwardRef((props, ref) => <Search { ...props } ref={ ref } />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward { ...props } ref={ ref } />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove { ...props } ref={ ref } />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn { ...props } ref={ ref } />),
  Retry: forwardRef((props, ref) => <Replay { ...props } ref={ ref } />),
  GoBack: forwardRef((props, ref) => <ArrowBackIcon { ...props } ref={ ref } fontSize="small" />),
  Redirect: forwardRef((props, ref) => <CustonRedirect { ...props } color={ colors.secondary.main } colorHover={ colors.info.main } ref={ ref } />),
  Download: forwardRef((props, ref) => <DownloadIcon { ...props } color={ colors.secondary.main } colorHover={ colors.info.main } ref={ ref } />)
}
