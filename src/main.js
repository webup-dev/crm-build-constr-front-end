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
          store.state.user.isSuperadmin = true;
          break;
        case 'admin':
          store.state.user.isAdmin = true;
          break;
        case 'platform-superadmin':
          store.state.user.isPlatformSuperadmin = true;
          break;
        case 'platform-admin':
          store.state.user.isPlatformAdmin = true;
          break;
        case 'organization-superadmin':
          store.state.user.isOrganizationSuperadmin = true;
          break;
        case 'organization-general-manager':
          store.state.user.isOrganizationGeneralManager = true;
          break;
        case 'organization-sales-manager':
          store.state.user.isOrganizationSalesManager = true;
          break;
        default:
          store.state.user.isGuest = true;
          break;
      }
    },
  
    allToFalse() {
      store.state.user.isSuperadmin = false;
      store.state.user.isAdmin = false;
      store.state.user.isPlatformSuperadmin = false;
      store.state.user.isPlatformAdmin = false;
      store.state.user.isOrganizationSuperadmin = false;
      store.state.user.isOrganizationGeneralManager = false;
      store.state.user.isOrganizationSalesManager = false
      store.state.user.isGuest = false
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
