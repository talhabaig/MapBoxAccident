import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMapboxTs from "vue-mapbox-ts";
createApp(App).use(VueMapboxTs).use(store).use(router).mount('#app')
