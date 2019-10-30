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
      name: 'Users',
      url: '/admin/user-profiles',
      icon: 'fa fa-users'
    },
    {
      name: 'Customers',
      url: '/admin/customers',
      icon: 'fa fa-users'
    }
  ]
}
