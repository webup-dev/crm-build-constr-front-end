import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: {
      isSuperadmin: false,
      isDeveloper: false,
      isAdmin: false,
      isPlatformSuperadmin: false,
      isPlatformAdmin: false,
      isOrganizationSuperadmin: false,
      isOrganizationAdmin: false,
      isOrganizationGeneralManager: false,
      isOrganizationSalesManager: false,
      isCustomer: false,
      isGuest: false
    },
    user: {
      name: '',
      role: '',
      id: ''
    },
    softDeleted: {
      0: {
        count: ''
      },
      1: {
        count: ''
      }
    }
  },

  getters: {
    auth(state) {
      return state.user
    }
  }
})
