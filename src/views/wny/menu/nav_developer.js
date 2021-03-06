export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard-developer',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary'
      }
    },
    {
      title: true,
      name: 'Demo',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Books',
      url: '/demo/books-static',
      icon: 'icon-book-open',
      children: [
        // {
        //   name: 'Roles Static',
        //   url: '/roles/roles-static',
        //   icon: 'fa fa-cog'
        // },
        {
          name: 'Books Static',
          url: '/demo/books-static',
          icon: 'icon-book-open'
        },
        {
          name: 'Books Axios',
          url: '/demo/books-axios',
          icon: 'icon-book-open'
        },
        {
          name: 'Books Final',
          url: '/demo/books-final',
          icon: 'icon-book-open'
        },
        {
          name: 'Create New Book',
          url: '/demo/create',
          icon: 'icon-pencil'
        }
      ]
    },
    {
      title: true,
      name: 'Administration',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Roles',
      url: '/roles/index',
      icon: 'fa fa-cog'
    },
    {
      name: 'Controllers',
      url: '/controllers/index',
      icon: 'fa fa-cog'
    },
    {
      name: 'User-Roles',
      url: '/user-roles/index',
      icon: 'fa fa-cog'
    },
    {
      name: 'Activities',
      url: '/admin/activities',
      icon: 'fa fa-paw'
    },
    {
      name: 'Organizations',
      url: '/admin/organization',
      icon: 'fa fa-building-o'
    },
    {
      name: 'Users',
      url: '/admin/user-profiles',
      icon: 'fa fa-users'
    },
    {
      name: 'Customers',
      url: '/admin/customers',
      icon: 'fa fa-users'
    },
    {
      name: 'User-Customers',
      url: '/admin/user-customers',
      icon: 'fa fa-users'
    },
    {
      name: 'Lead Categories',
      url: '/admin/lead-source-categories',
      icon: 'fa fa-users'
    },
    {
      name: 'Lead Sources',
      url: '/admin/lead-sources',
      icon: 'fa fa-users'
    },
    {
      name: 'Trades',
      url: '/admin/trades',
      icon: 'fa fa-users'
    },
    {
      name: 'Lead Statuses',
      url: '/admin/lead-statuses',
      icon: 'fa fa-users'
    },
    {
      name: 'Stages',
      url: '/admin/stages',
      icon: 'fa fa-users'
    },
    {
      name: 'Workflows',
      url: '/admin/workflows',
      icon: 'fa fa-users'
    },
    {
      name: 'Requesters',
      url: '/admin/requesters',
      icon: 'fa fa-users'
    },
    {
      name: 'Leads',
      url: '/admin/leads',
      icon: 'fa fa-users'
    },
    {
      title: true,
      name: 'Theme',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop'
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil'
    },
    {
      title: true,
      name: 'Components',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle'
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle'
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle'
        },
        {
          name: 'List Groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navbars',
          url: '/base/navbars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle'
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle'
        },
        {
          name: 'Progress Bars',
          url: '/base/progress-bars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/standard-buttons',
          icon: 'icon-cursor'
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Dropdowns',
          url: '/buttons/dropdowns',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Editors',
      url: '/editors',
      icon: 'fa fa-code',
      children: [
        {
          name: 'Code Editors',
          url: '/editors/code-editors',
          icon: 'fa fa-code',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Text Editors',
          url: '/editors/text-editors',
          icon: 'icon-note',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        }
      ]
    },
    {
      name: 'Forms',
      url: '/forms',
      icon: 'icon-note',
      children: [
        {
          name: 'Basic Forms',
          url: '/forms/basic-forms',
          icon: 'icon-note'
        },
        {
          name: 'Advanced Forms',
          url: '/forms/advanced-forms',
          icon: 'icon-note',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Validation',
          url: '/forms/validation-forms',
          icon: 'icon-note',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        }
      ]
    },
    {
      name: 'Google Maps',
      url: '/google-maps',
      icon: 'icon-map',
      badge: {
        variant: 'danger',
        text: 'PRO'
      }
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW'
          }
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star'
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell'
        },
        {
          name: 'Toastr',
          url: '/notifications/toastr',
          icon: 'icon-bell',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        }
      ]
    },
    {
      name: 'Plugins',
      url: '/plugins',
      icon: 'icon-energy',
      children: [
        {
          name: 'Draggable',
          url: '/plugins/draggable',
          icon: 'icon-cursor-move',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Calendar',
          url: '/plugins/calendar',
          icon: 'icon-calendar',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Spinners',
          url: '/plugins/spinners',
          icon: 'fa fa-spinner',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
      ]
    },
    {
      name: 'Tables',
      url: '/tables',
      icon: 'icon-list',
      children: [
        {
          name: 'Data Table',
          url: '/tables/data-table',
          icon: 'icon-list',
          badge: {
            variant: 'danger',
            text: 'PRO'
          }
        },
        {
          name: 'Tables',
          url: '/tables/tables',
          icon: 'icon-list'
        }
      ]
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      badge: {
        variant: 'secondary',
        text: 'NEW'
      },
      attributes: {disabled: true},
    },
    {
      name: 'Apps',
      url: '/apps',
      icon: 'icon-layers',
      children: [
        {
          name: 'Invoicing',
          url: '/apps/invoicing',
          icon: 'icon-speech',
          children: [
            {
              name: 'Invoice',
              url: '/apps/invoicing/invoice',
              icon: 'icon-speech',
              badge: {
                variant: 'danger',
                text: 'PRO'
              }
            }
          ]
        },
        {
          name: 'Email',
          url: '/apps/email',
          icon: 'icon-speech',
          children: [
            {
              name: 'Inbox',
              url: '/apps/email/inbox',
              icon: 'icon-speech',
              badge: {
                variant: 'danger',
                text: 'PRO'
              }
            },
            {
              name: 'Message',
              url: '/apps/email/message',
              icon: 'icon-speech',
              badge: {
                variant: 'danger',
                text: 'PRO'
              }
            },
            {
              name: 'Compose',
              url: '/apps/email/compose',
              icon: 'icon-speech',
              badge: {
                variant: 'danger',
                text: 'PRO'
              }
            }
          ]
        }
      ]
    },
    {
      divider: true,
      class: 'm-2'
    },
    {
      title: true,
      name: 'Labels'
    },
    {
      name: 'Label danger',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'danger'
      }
    },
    {
      name: 'Label info',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'info'
      }
    },
    {
      name: 'Label warning',
      url: '',
      icon: 'fa fa-circle',
      label: {
        variant: 'warning'
      }
    }
  ]
}
