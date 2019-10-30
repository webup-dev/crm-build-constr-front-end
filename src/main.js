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
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

require('vue-flash-message/dist/vue-flash-message.min.css');
// todo
// cssVars()

Vue.use(BootstrapVue)
// Vue.use(VueResource)
Vue.use(VueFlashMessage)
Vue.use(Vuelidate)
Vue.use(VCalendar)

const token = localStorage.token;
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  Vue.prototype.$http.defaults.headers.common['Accept'] = 'application/json'
}

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
