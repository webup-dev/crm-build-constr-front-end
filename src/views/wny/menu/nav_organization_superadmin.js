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
      name: 'User-Roles',
      url: '/user-roles/index',
      icon: 'fa fa-cog'
    },
    {
      name: 'User Profiles',
      url: '/admin/user-profiles',
      icon: 'fa fa-users'
    }
  ]
}
