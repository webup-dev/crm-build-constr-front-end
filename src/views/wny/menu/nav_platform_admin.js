export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
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
    }
  ]
}
