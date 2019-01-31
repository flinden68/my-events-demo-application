import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'es6-promise/auto';
import store from './store';
import i18n from './lang/lang';
import './assets/css/global.css';
import router from './router/router'

Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
    store,
    router,
    i18n,
  render: h => h(App)
}).$mount('#app')

