import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'


Vue.use(VueResource)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  router,
  store,
  moment,
  axios,
  VueResource,
  render: h => h(App)
}).$mount('#app')
