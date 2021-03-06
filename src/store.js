import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

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
    userDetails: {
      customerId: '',
      userId: ''
    },
    listStages: [],
    workflow: [],
    requester: {},
    trades: {},
    leadStatuses: {},
    declinedReasons: {}
  },

  getters: {
    auth(state) {
      return state.user
    },
    userDetails(state) {
      return state.userDetails
    }
  },

  mutations: {
    setUDCustomerId(state, id) {
      state.userDetails.customerId = id;
    },
    setUDUserId(state, id) {
      state.userDetails.userId = id;
    },
    setListStages(state, array) {
      state.listStages = array;
    },
    setWorkflow(state, array) {
      state.workflow = array;
    },
    setRequester(state, obj) {
      state.requester = obj;
    },
    setTrades(state, obj) {
      state.trades = obj;
    },
    setLeadStatuses(state, obj) {
      state.leadStatuses = obj;
    },
    setDeclinedReasons(state, obj) {
      state.declinedReasons = obj;
    }
  }
})
