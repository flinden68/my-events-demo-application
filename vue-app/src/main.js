import {createApp} from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import 'es6-promise/auto';
import store from './store';
import i18n from './i18n'
import './assets/css/global.css';
import router from './router/router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from "axios";

const app = createApp(App);
app.component('VueDatePicker', VueDatePicker);
app.use(VueAxios, axios)
app.use(store);
app.use(router);
app.use(i18n);
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount('#app');


