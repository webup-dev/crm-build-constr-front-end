import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      isSuperadmin: false,
      isAdmin: false,
      isPlatformSuperadmin: false,
      isPlatformAdmin: false,
      isOrganizationSuperadmin: false,
      isOrganizationGeneralManager: false,
      isOrganizationSalesManager: false,
      isGuest: false
    }
  },

  getters: {
    auth(state) {
      return state.user
    }
  }
})
