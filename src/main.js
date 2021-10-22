import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router";
import axios from "axios";
// import moment from "moment";

//BootstrapVue setup
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
// Vue.prototype.moment = moment;

new Vue({
    router,
    store,
    render: (h) => h(App),
    /**
     * This is to set token to any request to server side.
     * @returns Resquest with configurations
     */
    created() {
        axios.interceptors.request.use(
            function (config) {
                if (store.state.user) {
                    const tokenType = store.state.user.data.token_type;
                    const token = store.state.user.data.access_token;
                    if (token) config.headers.Authorization = `${tokenType} ${token}`;
                }
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    },
}).$mount('#app')