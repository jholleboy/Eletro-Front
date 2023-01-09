import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import LightBootstrap from './light-bootstrap-main'
import routes from './routes/routes'
import './registerServiceWorker'
import vuetify from '@/plugins/vuetify'
import axios from "axios";


//Vue.use(BootstrapVue);
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
Vue.use(VueRouter)
Vue.use(LightBootstrap)


const router = new VueRouter({
  routes, 
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  render: h => h(App),
  router
})
