import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import home from "./components/home";
import eventList from "./components/event-list";
import addEvent from "./components/add-event";
import editEvent from "./components/edit-event";
import login from "./components/login";
import logout from "./components/logout";
import register from "./components/register";
import account from "./components/account";
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'es6-promise/auto';
import store from './store';
import i18n from './lang/lang';

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const routes = [
    { path: '/', component: home },
    { path: '/events', component: eventList },
    { path: '/event/add', component: addEvent },
    { path: '/event/:id', component: editEvent },
    { path: '/login', component: login },
    { path: '/logout', component: logout },
    { path: '/register', component: register },
    { path: '/account', component: account }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

new Vue({
    router,
    store,
    i18n,
  render: h => h(App)
}).$mount('#app')
