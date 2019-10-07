// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router/index'
import store from "./store";
import axios from './backend/vue-axios'
import VueFlashMessage from 'vue-flash-message';
require('vue-flash-message/dist/vue-flash-message.min.css');
// todo
// cssVars()

// import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)
Vue.use(VueFlashMessage)
Vue.use(Vuelidate)


const token = localStorage.token;
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  Vue.prototype.$http.defaults.headers.common['Accept'] = 'application/json'
}

Vue.mixin({
  methods: {
    roleStoreConfig(mainRole) {
      this.allToFalse();
      switch (mainRole) {
        case 'superadmin':
          store.state.role.isSuperadmin = true;
          break;
        case 'developer':
          store.state.role.isDeveloper = true;
          break;
        case 'admin':
          store.state.role.isAdmin = true;
          break;
        case 'platform-superadmin':
          store.state.role.isPlatformSuperadmin = true;
          break;
        case 'platform-admin':
          store.state.role.isPlatformAdmin = true;
          break;
        case 'organization-superadmin':
          store.state.role.isOrganizationSuperadmin = true;
          break;
        case 'organization-general-manager':
          store.state.role.isOrganizationGeneralManager = true;
          break;
        case 'organization-sales-manager':
          store.state.role.isOrganizationSalesManager = true;
          break;
        default:
          store.state.role.isGuest = true;
          break;
      }
    },
  
    allToFalse() {
      store.state.role.isSuperadmin = false;
      store.state.role.isDeveloper = false;
      store.state.role.isAdmin = false;
      store.state.role.isPlatformSuperadmin = false;
      store.state.role.isPlatformAdmin = false;
      store.state.role.isOrganizationSuperadmin = false;
      store.state.role.isOrganizationGeneralManager = false;
      store.state.role.isOrganizationSalesManager = false;
      store.state.role.isGuest = false
    },
  
    userStoreConfig(name) {
      store.state.user.name = name;
    },
    userRoleStoreConfig(role) {
      store.state.user.role = role;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: {
    App
  }
})
