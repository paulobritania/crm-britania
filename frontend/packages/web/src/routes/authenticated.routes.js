import { useMemo, useCallback, lazy } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import find from 'lodash/find'
import filterFP from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import mapFP from 'lodash/fp/map'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import omitBy from 'lodash/omitBy'

import HomeIcon from '@material-ui/icons/Home'

import {
  USER_ACCESSES,
  USER_ACTIONS
} from '@britania-crm/constants/auth.constants'
import { useT } from '@britania-crm/i18n'
import {
  selectAuthUserAccesses,
  selectAuthUserPermissions
} from '@britania-crm/stores/auth/auth.selectors'
import AssignmentIcon from '@britania-crm/web-components/Icons/AssignmentIcon'
import GavelIcon from '@britania-crm/web-components/Icons/GavelIcon'
import MonetizationIcon from '@britania-crm/web-components/Icons/MonetizationIcon'
import SettingsIcon from '@britania-crm/web-components/Icons/SettingsIcon'
import WorkIcon from '@britania-crm/web-components/Icons/WorkIcon'

const MessageboardScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/messageboards/screens/MessageboardScreen'
  )
)
const UsersListScreen = lazy(() =>
  import('@britania-crm/web-src/modules/users/screens/UsersListScreen')
)
const ProfilesListScreen = lazy(() =>
  import('@britania-crm/web-src/modules/profiles/screens/ProfilesListScreen')
)
const DashboardScreen = lazy(() =>
  import('@britania-crm/web-src/modules/dashboard/screens/DashboardScreen')
)
const CustomerScreen = lazy(() =>
  import('@britania-crm/web-src/modules/customers/screens/CustomerScreen')
)
const WorkflowPanel = lazy(() =>
  import(
    '@britania-crm/web-src/modules/workflowPanel/screens/WorkflowPanelScreen'
  )
)
const WorkflowPanelCreate = lazy(() =>
  import(
    '@britania-crm/web-src/modules/workflowPanel/screens/WorkflowPanelCreateScreen'
  )
)
const ProfileFormScreen = lazy(() =>
  import('@britania-crm/web-src/modules/profiles/screens/ProfileFormScreen')
)
const ImageLoginScreen = lazy(() =>
  import('@britania-crm/web-src/modules/imagelogin/screens/ImageLoginScreen')
)
const BankFormScreen = lazy(() =>
  import('@britania-crm/web-src/modules/banks/screens/BankFormScreen')
)
const BankListScreen = lazy(() =>
  import('@britania-crm/web-src/modules/banks/screens/BankListScreen')
)
const BuyerListScreen = lazy(() =>
  import('@britania-crm/web-src/modules/buyer/screens/BuyerListScreen')
)
const CustomerRanking = lazy(() =>
  import(
    '@britania-crm/web-src/modules/customerRanking/screens/CustomerRanking'
  )
)
const BuyerFormScreen = lazy(() =>
  import('@britania-crm/web-src/modules/buyer/screens/BuyerFormScreen')
)
const CustomerFormScreen = lazy(() =>
  import('@britania-crm/web-src/modules/customers/screens/CustomerFormScreen')
)
const CustomerPreRegistrationFormScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/customers/screens/CustomerPreRegistrationFormScreen'
  )
)
const Vpc = lazy(() => import('../modules/vpc/screens/Vpc/Vpc'))
const DocumentationListScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/documentation/screens/DocumentationListScreen'
  )
)
const DocumentationFormScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/documentation/screens/DocumentationFormScreen'
  )
)
const VpcListScreen = lazy(() =>
  import('@britania-crm/web-src/modules/vpc/screens/VpcListScreen')
)
const RepresentativeScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/representative/screens/RepresentativeScreen'
  )
)
const RepresentativeFormScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/representative/screens/RepresentativeFormScreen'
  )
)
const FanListScreen = lazy(() =>
  import('@britania-crm/web-src/modules/fan/screens/FanListScreen')
)
const FanFormScreen = lazy(() =>
  import('@britania-crm/web-src/modules/fan/screens/FanFormScreen')
)
const Sla = lazy(() =>
  import('@britania-crm/web-src/modules/sla/screens/Sla/Sla')
)
const CompanyFormScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/companies/screens/CompanyFormScreen/CompanyFormScreen'
  )
)
const CompaniesListScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/companies/screens/CompaniesListScreen/CompaniesListScreen'
  )
)
const EqualizationScreen = lazy(() =>
  import(
    '@britania-crm/web-src/modules/equalization/screens/EqualizationScreen/EqualizationScreen'
  )
)
const ReportContractPercentageScreen = lazy(() =>
  import('../modules/vpc/screens/ReportContractPercentageScreen')
)

export const useRoutes = () => {
  const t = useT()

  const userAccesses = useSelector(selectAuthUserAccesses)
  const userPermissions = useSelector(selectAuthUserPermissions)

  const { path: currentPath } = useRouteMatch()

  const hasPermissionByRoute = useCallback(
    (route = {}) => {
      let enabledByAccess = true
      let enabledByAction = true

      if (route.menu?.subMenu) {
        return !isEmpty(route.menu?.subMenu)
      }

      if (route.access) {
        enabledByAccess = indexOf(userAccesses, route.access) > -1

        if (route.action) {
          enabledByAction =
            userPermissions?.[route.access]?.permissions?.[route.action]
        }
      }

      return enabledByAccess && enabledByAction
    },
    [userAccesses, userPermissions]
  )

  const mainRoutes = useMemo(
    () => ({
      administrative: {
        path: '/administrative',
        exact: true,
        Component: null,
        menu: {
          root: true,
          exact: false,
          Icon: SettingsIcon,
          title: t('administrative'),
          subMenu: [
            'users',
            'profiles',
            'workflowPanel',
            'messageboard',
            'imagelogin',
            'customerRanking',
            'documentation',
            'companies'
          ]
        }
      },

      users: {
        path: '/administrative/users',
        exact: true,
        Component: UsersListScreen,
        access: USER_ACCESSES.CONTROLE_DE_USUARIO,
        menu: {
          exact: false,
          title: t('user control')
        }
      },

      imagelogin: {
        path: '/administrative/imagelogin',
        exact: true,
        Component: ImageLoginScreen,
        access: USER_ACCESSES.IMAGEM_DO_LOGIN,
        action: USER_ACCESSES.EDITAR,
        menu: {
          exact: false,
          title: t('login image')
        }
      },

      profiles: {
        path: '/administrative/profiles',
        exact: true,
        Component: ProfilesListScreen,
        access: USER_ACCESSES.CONTROLE_DE_PERFIL,
        menu: {
          exact: false,
          title: t('profiles control')
        }
      },
      newProfile: {
        path: '/administrative/profiles/create',
        exact: true,
        Component: ProfileFormScreen,
        access: USER_ACCESSES.CONTROLE_DE_PERFIL,
        action: USER_ACTIONS.INCLUIR
      },
      editProfile: {
        path: '/administrative/profiles/edit',
        exact: true,
        Component: ProfileFormScreen,
        access: USER_ACCESSES.CONTROLE_DE_PERFIL,
        action: USER_ACTIONS.EDITAR
      },

      messageboard: {
        path: '/administrative/message-board',
        exact: true,
        Component: MessageboardScreen,
        access: USER_ACCESSES.MURAL_DE_RECADOS,
        menu: {
          exact: false,
          title: t('message boards')
        }
      },

      workflowPanel: {
        path: '/administrative/workflow-panel',
        exact: true,
        Component: WorkflowPanel,
        access: USER_ACCESSES.PAINEL_DE_WORKFLOW,
        menu: {
          exact: false,
          title: t('workflow panel')
        }
      },
      workflowPanelCreate: {
        path: '/administrative/workflow-panel/create',
        exact: true,
        Component: WorkflowPanelCreate,
        access: USER_ACCESSES.PAINEL_DE_WORKFLOW,
        action: USER_ACTIONS.INCLUIR
      },
      workflowPanelEdit: {
        path: '/administrative/workflow-panel/edit',
        exact: true,
        Component: WorkflowPanelCreate,
        access: USER_ACCESSES.PAINEL_DE_WORKFLOW,
        action: USER_ACTIONS.EDITAR
      },
      workflowPanelView: {
        path: '/administrative/workflow-panel/view',
        exact: true,
        Component: WorkflowPanelCreate,
        access: USER_ACCESSES.PAINEL_DE_WORKFLOW
      },

      documentation: {
        path: '/administrative/documentation',
        exact: true,
        Component: DocumentationListScreen,
        access: USER_ACCESSES.ADMINISTRATIVO,
        menu: {
          exact: false,
          title: t('documentation', { howMany: 1 })
        }
      },
      newDocumentation: {
        path: '/administrative/documentation/create',
        exact: true,
        Component: DocumentationFormScreen,
        access: USER_ACCESSES.ADMINISTRATIVO,
        action: USER_ACTIONS.INCLUIR
      },
      editDocumentation: {
        path: '/administrative/documentation/edit',
        exact: true,
        Component: DocumentationFormScreen,
        access: USER_ACCESSES.ADMINISTRATIVO,
        action: USER_ACTIONS.EDITAR
      },
      companies: {
        path: '/administrative/companies',
        exact: true,
        Component: CompaniesListScreen,
        access: USER_ACCESSES.ADMINISTRATIVO,
        menu: {
          exact: false,
          title: t('company registration')
        }
      },
      newCompany: {
        path: '/administrative/companies/create',
        exact: true,
        Component: CompanyFormScreen,
        access: USER_ACCESSES.ADMINISTRATIVO,
        action: USER_ACTIONS.INCLUIR
      },
      editCompany: {
        path: '/administrative/companies/edit',
        exact: true,
        Component: CompanyFormScreen,
        access: USER_ACCESSES.ADMINISTRATIVO,
        action: USER_ACTIONS.EDITAR
      },
      viewCompany: {
        path: '/administrative/companies/view',
        exact: true,
        Component: CompanyFormScreen,
        access: USER_ACCESSES.ADMINISTRATIVO
      },

      client: {
        path: '/client',
        exact: true,
        Component: null,
        menu: {
          root: true,
          exact: false,
          Icon: WorkIcon,
          title: t('client', { howMany: 1 }),
          subMenu: ['buyers', 'customers', 'representatives']
        }
      },

      buyers: {
        path: '/client/buyers',
        exact: true,
        Component: BuyerListScreen,
        access: USER_ACCESSES.COMPRADORES,
        menu: {
          exact: false,
          title: t('buyer', { howMany: 1 })
        }
      },
      newBuyer: {
        path: '/client/buyers/create',
        exact: true,
        Component: BuyerFormScreen,
        access: USER_ACCESSES.COMPRADORES,
        action: USER_ACTIONS.INCLUIR
      },
      editBuyer: {
        path: '/client/buyers/edit',
        exact: true,
        Component: BuyerFormScreen,
        access: USER_ACCESSES.COMPRADORES,
        action: USER_ACTIONS.EDITAR
      },
      viewBuyer: {
        path: '/client/buyers/view',
        exact: true,
        Component: BuyerFormScreen,
        access: USER_ACCESSES.COMPRADORES
      },

      customers: {
        path: '/client/customers',
        exact: true,
        Component: CustomerScreen,
        access: USER_ACCESSES.CLIENTES,
        menu: {
          exact: false,
          title: t('customer', { howMany: 1 })
        }
      },

      newCustomerPreRegistration: {
        path: '/client/customers/pre-registration/create',
        exact: true,
        Component: CustomerPreRegistrationFormScreen,
        access: USER_ACCESSES.CLIENTES,
        action: USER_ACTIONS.INCLUIR
      },

      editCustomerPreRegistration: {
        path: '/client/customers/pre-registration/edit',
        exact: true,
        Component: CustomerPreRegistrationFormScreen,
        access: USER_ACCESSES.CLIENTES,
        action: USER_ACTIONS.EDITAR
      },

      viewCustomerPreRegistration: {
        path: '/client/customers/pre-registration/view',
        exact: true,
        Component: CustomerPreRegistrationFormScreen,
        access: USER_ACCESSES.CLIENTES
      },

      newCustomer: {
        path: '/client/customers/create',
        exact: true,
        Component: CustomerFormScreen,
        access: USER_ACCESSES.CLIENTES,
        action: USER_ACTIONS.INCLUIR
      },

      editCustomer: {
        path: '/client/customers/edit',
        exact: true,
        Component: CustomerFormScreen,
        access: USER_ACCESSES.CLIENTES,
        action: USER_ACTIONS.EDITAR
      },

      viewCustomer: {
        path: '/client/customers/view',
        exact: true,
        Component: CustomerFormScreen,
        access: USER_ACCESSES.CLIENTES
      },

      representatives: {
        path: '/client/representatives',
        exact: true,
        Component: RepresentativeScreen,
        access: USER_ACCESSES.CLIENTES,
        menu: {
          exact: false,
          title: t('representative', { howMany: 1 })
        }
      },

      newRepresentative: {
        path: '/client/representatives/create',
        exact: true,
        Component: RepresentativeFormScreen,
        access: USER_ACCESSES.CLIENTES,
        action: USER_ACTIONS.INCLUIR
      },

      editRepresentative: {
        path: '/client/representatives/edit',
        exact: true,
        Component: RepresentativeFormScreen,
        access: USER_ACCESSES.CLIENTES,
        action: USER_ACTIONS.EDITAR
      },

      viewRepresentative: {
        path: '/client/representatives/view',
        exact: true,
        Component: RepresentativeFormScreen
      },

      customerRanking: {
        path: '/administrative/client/ranking',
        exact: true,
        Component: CustomerRanking,
        access: USER_ACCESSES.RANKING_DO_CLIENTE,
        menu: {
          root: false,
          exact: false,
          title: t('Customer Ranking')
        }
      },

      financial: {
        path: '/financial',
        exact: true,
        Component: null,
        menu: {
          root: true,
          exact: false,
          Icon: MonetizationIcon,
          title: t('financial'),
          subMenu: ['equalization', 'banks']
        }
      },

      equalization: {
        path: '/financial/equalization',
        exact: true,
        Component: EqualizationScreen,
        access: USER_ACCESSES.CONTAS_A_RECEBER,
        menu: {
          exact: false,
          title: t('equalization')
        }
      },

      banks: {
        path: '/financial/banks',
        exact: true,
        Component: BankListScreen,
        access: USER_ACCESSES.BANCOS,
        menu: {
          exact: false,
          title: t('bank', { howMany: 1 })
        }
      },

      newBank: {
        path: '/financial/banks/create',
        exact: true,
        Component: BankFormScreen,
        access: USER_ACCESSES.BANCOS,
        action: USER_ACTIONS.INCLUIR
      },

      editBank: {
        path: '/financial/banks/edit',
        exact: true,
        Component: BankFormScreen,
        access: USER_ACCESSES.BANCOS,
        action: USER_ACTIONS.EDITAR
      },

      vpcModule: {
        path: '/vpc',
        exact: true,
        Component: null,
        menu: {
          root: true,
          exact: false,
          Icon: GavelIcon,
          title: 'VPC',
          subMenu: ['vpc']
        }
      },

      vpc: {
        path: '/vpc/vpc',
        exact: true,
        Component: VpcListScreen,
        access: USER_ACCESSES.VPC,
        menu: {
          exact: false,
          title: 'VPC'
        }
      },

      newVpc: {
        path: '/vpc/vpc/create',
        exact: true,
        Component: Vpc,
        access: USER_ACCESSES.VPC,
        action: USER_ACTIONS.INCLUIR
      },

      viewVpc: {
        path: '/vpc/vpc/view',
        exact: true,
        Component: Vpc,
        access: USER_ACCESSES.VPC
      },

      editVpc: {
        path: '/vpc/vpc/edit',
        exact: true,
        Component: Vpc,
        access: USER_ACCESSES.VPC,
        action: USER_ACTIONS.EDITAR
      },

      fan: {
        path: '/fan',
        exact: true,
        Component: FanListScreen,
        access: USER_ACCESSES.VPC,
        menu: {
          exact: false,
          title: 'FAN'
        }
      },

      newFan: {
        path: '/fan/create',
        exact: true,
        Component: FanFormScreen,
        access: USER_ACCESSES.VPC,
        action: USER_ACTIONS.INCLUIR
      },

      editFan: {
        path: '/fan/edit',
        exact: true,
        Component: FanFormScreen,
        access: USER_ACCESSES.VPC,
        action: USER_ACTIONS.INCLUIR
      },

      viewFan: {
        path: '/fan/view',
        exact: true,
        Component: FanFormScreen
      },

      sla: {
        path: '/sla',
        exact: true,
        Component: Sla,
        access: USER_ACCESSES.VPC
      },

      reports: {
        path: '/reports',
        exact: true,
        Component: null,
        menu: {
          root: true,
          exact: false,
          Icon: AssignmentIcon,
          title: t('report', { howMany: 2 }),
          subMenu: ['reportVpc']
        }
      },

      reportVpc: {
        path: '/reports/vpc',
        exact: true,
        Component: null,
        menu: {
          exact: false,
          title: 'VPC',
          subMenu: ['reportVpcContractPercentage']
        }
      },

      reportVpcContractPercentage: {
        path: '/reports/vpc/contract-percentage',
        exact: true,
        Component: ReportContractPercentageScreen,
        access: USER_ACCESSES.VPC,
        menu: {
          exact: false,
          title: t('report of {this}', { howMany: 1, this: 'VPC' })
        }
      },

      home: {
        path: '/',
        exact: true,
        Component: DashboardScreen,
        menu: {
          root: true,
          exact: true,
          Icon: HomeIcon,
          title: t('home')
        }
      }
    }),
    [t]
  )

  const mergeRoutesWithMenu = useCallback(
    (routes) =>
      mapValues(routes, (route) => {
        if (route?.menu?.subMenu) {
          return {
            ...route,
            menu: {
              ...route.menu,
              subMenu: map(
                mergeRoutesWithMenu(
                  flow(
                    mapFP((subMenu) => mainRoutes[subMenu]),
                    filterFP((subMenu) => !!subMenu?.path),
                    filterFP(hasPermissionByRoute)
                  )(route.menu.subMenu)
                ),
                (item) => item
              )
            }
          }
        }
        return route
      }),
    [hasPermissionByRoute, mainRoutes]
  )

  const appRoutes = useMemo(
    () =>
      omitBy(
        mergeRoutesWithMenu(mainRoutes),
        (route) => !hasPermissionByRoute(route)
      ),
    [hasPermissionByRoute, mainRoutes, mergeRoutesWithMenu]
  )

  const currentRoute = useMemo(
    () => find(appRoutes, { path: currentPath }),
    [appRoutes, currentPath]
  )

  const currentRoutePermissions = useMemo(
    () => userPermissions?.[currentRoute?.access]?.permissions || {},
    [currentRoute, userPermissions]
  )

  const toolkit = useMemo(
    () => ({
      routes: appRoutes,
      currentRoute,
      currentRoutePermissions,
      currentPath
    }),
    [appRoutes, currentRoute, currentRoutePermissions, currentPath]
  )

  return toolkit
}
