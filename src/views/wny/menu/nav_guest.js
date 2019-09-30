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
  ]
}
