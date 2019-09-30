import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Books
const BooksStatic = () => import('@/views/wny/books/index/BooksStatic')
const BooksAxios = () => import('@/views/wny/books/index/BooksAxios')
const BooksFinal = () => import('@/views/wny/books/index/BooksFinal')
const BookCreate = () => import('@/views/wny/books/create/BookCreate')
const BookShowStatic = () => import('@/views/wny/books/show/BookShowStatic')
const BookShowFinal = () => import('@/views/wny/books/show/BookShowFinal')
const BookEdit = () => import('@/views/wny/books/edit/BookEdit')

// Views - WNY
const SignIn = () => import('@/views/wny/auth/Login');

// Views - Roles
const RolesStatic = () => import('@/views/wny/roles/index/RolesStatic')
const RolesAxios = () => import('@/views/wny/roles/index/RolesAxios')
const RolesFinal = () => import('@/views/wny/roles/index/RolesFinal')
const RoleCreate = () => import('@/views/wny/roles/create/RoleCreate')
const RoleShowStatic = () => import('@/views/wny/roles/show/RoleShowStatic')
const RoleShowFinal = () => import('@/views/wny/roles/show/RoleShowFinal')
const RoleEdit = () => import('@/views/wny/roles/edit/RoleEdit')

// Views - Controllers
const ControllersStatic = () => import('@/views/wny/controllers/index/ControllersStatic')
const Controllers = () => import('@/views/wny/controllers/index/Controllers')
const ControllerCreate = () => import('@/views/wny/controllers/create/ControllerCreate')
const ControllerEdit = () => import('@/views/wny/controllers/edit/ControllerEdit')

// Views - Methods
const MethodsStatic = () => import('@/views/wny/methods/index/MethodsStatic')
const Methods = () => import('@/views/wny/methods/index/Methods')
const MethodCreate = () => import('@/views/wny/methods/create/MethodCreate')
const MethodEdit = () => import('@/views/wny/methods/edit/MethodEdit')

// Views - Method-Roles
const MethodRolesStatic = () => import('@/views/wny/method-roles/index/MethodRolesStatic')
const MethodRoles = () => import('@/views/wny/method-roles/index/MethodRoles')
const MethodRolesCreate = () => import('@/views/wny/method-roles/create/MethodRolesCreate')
const MethodRolesEdit = () => import('@/views/wny/method-roles/edit/MethodRolesEdit')

// Views - User-Roles
const UserRolesStatic = () => import('@/views/wny/user-roles/index/UserRolesStatic')
const UserRoles = () => import('@/views/wny/user-roles/index/UserRoles')
const UserRoleCreate = () => import('@/views/wny/user-roles/create/UserRoleCreate')
const UserRoleEdit = () => import('@/views/wny/user-roles/edit/UserRoleEdit')
const UserRoleEditStatic = () => import('@/views/wny/user-roles/edit/UserRoleEditStatic')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Switches = () => import('@/views/base/Switches')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Editors
const TextEditors = () => import('@/views/editors/TextEditors')
const CodeEditors = () => import('@/views/editors/CodeEditors')

// Views - Forms
const BasicForms = () => import('@/views/forms/BasicForms')
const AdvancedForms = () => import('@/views/forms/AdvancedForms')
const ValidationForms = () => import('@/views/forms/ValidationForms')

// Views GoogleMaps
const GoogleMaps = () => import('@/views/GoogleMaps')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')
const Toastr = () => import('@/views/notifications/Toastr')

// Views - Tables
const Tables = () => import('@/views/tables/Tables')
const DataTable = () => import('@/views/tables/DataTable')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

// Plugins
const Draggable = () => import('@/views/plugins/Draggable')
const Calendar = () => import('@/views/plugins/Calendar')
const Spinners = () => import('@/views/plugins/Spinners')

// Views - UI Kits
const Invoice = () => import('@/views/apps/invoicing/Invoice')
const Compose = () => import('@/views/apps/email/Compose')
const Inbox = () => import('@/views/apps/email/Inbox')
const Message = () => import('@/views/apps/email/Message')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'demo',
          redirect: '/demo/books',
          name: 'Book',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'books-static',
              name: 'BookStatic',
              component: BooksStatic
            },
            {
              path: 'books-axios',
              name: 'BookAxios',
              component: BooksAxios
            },
            {
              path: 'books-final',
              name: 'BookFinal',
              component: BooksFinal
            },
            {
              path: 'create',
              name: 'BookCreate',
              component: BookCreate
            },
            {
              path: 'books/:id/static',
              component: BookShowStatic
            },
            {
              path: 'books/:id',
              component: BookShowFinal
            }            ,
            {
              path: 'books/:id/edit',
              component: BookEdit
            }
          ]
        },
        {
          path: 'roles',
          redirect: '/roles',
          name: 'Role',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'roles-static',
              name: 'RoleStatic',
              component: RolesStatic
            },
            {
              path: 'roles-axios',
              name: 'RoleAxios',
              component: RolesAxios
            },
            {
              path: 'index',
              name: 'Roles',
              component: RolesFinal
            },
            {
              path: 'create',
              name: 'RoleCreate',
              component: RoleCreate
            },
            {
              path: ':id/static',
              component: RoleShowStatic
            },
            {
              path: ':id',
              component: RoleShowFinal
            }            ,
            {
              path: ':id/edit',
              component: RoleEdit
            }
          ]
        },
        {
          path: 'controllers',
          redirect: '/index',
          name: 'Controllers',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'controllers-static',
              name: 'ControllersStatic',
              component: ControllersStatic
            },
            {
              path: 'index',
              name: 'ControllerIndex',
              component: Controllers
            },
            {
              path: 'create',
              name: 'ControllerCreate',
              component: ControllerCreate
            },
            {
              path: ':id/edit',
              component: ControllerEdit
            }
          ]
        },
        {
          path: 'methods',
          redirect: '/methods',
          name: 'Methods',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: ':id/methods-static',
              name: 'MethodsStatic',
              component: MethodsStatic
            },
            {
              path: ':id',
              name: 'MethodIndex',
              component: Methods
            },
            {
              path: ':id/create',
              name: 'MethodCreate',
              component: MethodCreate
            },
            {
              path: ':id/edit',
              component: MethodEdit
            }
          ]
        },
        {
          path: 'method-roles',
          redirect: '/method-roles',
          name: 'MethodRoles',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: ':id/method-roles-static',
              name: 'MethodRolesStatic',
              component: MethodRolesStatic
            },
            {
              path: ':id',
              name: 'MethodRoleIndex',
              component: MethodRoles
            },
            {
              path: ':id/create',
              name: 'MethodRolesCreate',
              component: MethodRolesCreate
            },
            {
              path: ':id/edit',
              component: MethodRolesEdit
            }
          ]
        },
        {
          path: 'user-roles',
          redirect: '/user-roles',
          name: 'User-Roles',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'index-static',
              name: 'UserRoleStatic',
              component: UserRolesStatic
            },
            {
              path: 'index',
              name: 'UserRoles',
              component: UserRoles
            },
            {
              path: 'create/:id',
              name: 'UserRoleCreate',
              component: UserRoleCreate
            },
            {
              path: ':id/edit',
              component: UserRoleEdit
            },
            {
              path: ':id/edit/static',
              component: UserRoleEditStatic
            }
          ]
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: {label: 'Users'},
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: {label: 'User Details'},
              name: 'User',
              component: User,
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'editors',
          redirect: '/editors/text-editors',
          name: 'Editors',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'text-editors',
              name: 'Text Editors',
              component: TextEditors
            },
            {
              path: 'code-editors',
              name: 'Code Editors',
              component: CodeEditors
            }
          ]
        },
        {
          path: 'forms',
          redirect: '/forms/basic-forms',
          name: 'Forms',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'basic-forms',
              name: 'Basic Forms',
              component: BasicForms
            },
            {
              path: 'advanced-forms',
              name: 'Advanced Forms',
              component: AdvancedForms
            },
            {
              path: 'validation-forms',
              name: 'Form Validation',
              component: ValidationForms
            }
          ]
        },
        {
          path: 'google-maps',
          name: 'Google Maps',
          component: GoogleMaps
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            },
            {
              path: 'toastr',
              name: 'Toastr',
              component: Toastr
            }
          ]
        },
        {
          path: 'plugins',
          redirect: '/plugins/draggable',
          name: 'Plugins',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'draggable',
              name: 'Draggable Cards',
              component: Draggable
            },
            {
              path: 'calendar',
              name: 'Calendar',
              component: Calendar
            },
            {
              path: 'spinners',
              name: 'Spinners',
              component: Spinners
            },
          ]
        },
        {
          path: 'tables',
          redirect: '/tables/tables',
          name: 'Tables',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'tables',
              name: 'Simple Tables',
              component: Tables
            },
            {
              path: 'data-table',
              name: 'Data Table',
              component: DataTable
            },
          ]
        },
        {
          path: 'apps',
          name: 'Apps',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'invoicing',
              redirect: '/apps/invoicing/invoice',
              name: 'Invoicing',
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: 'invoice',
                  name: 'Invoice',
                  component: Invoice
                }
              ]
            },
            {
              path: 'email',
              redirect: '/apps/email/inbox',
              name: 'Email',
              component: {
                render(c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: 'compose',
                  name: 'Compose',
                  component: Compose
                },
                {
                  path: 'inbox',
                  name: 'Inbox',
                  component: Inbox
                },
                {
                  path: 'message',
                  name: 'Message',
                  component: Message
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/404',
      name: 'Auth',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        // {
        //   path: '404',
        //   name: 'Page404',
        //   component: Page404
        // },
        // {
        //   path: '500',
        //   name: 'Page500',
        //   component: Page500
        // },
        {
          path: 'sign-in',
          name: 'SignIn',
          component: SignIn
        },
        {
          path: 'register',
          name: 'SignUp',
          component: Register
        }
      ]
    }
  ]
})
