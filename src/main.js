import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL="http://localhost:3000/api/v1"

createApp(App).use(VueAxios, axios).use(store).use(router).mount("#app");
