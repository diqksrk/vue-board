import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'


//Vue.config.productionTip = false


Vue.prototype.$axios=axios;




new Vue({
  render: h => h(App),
}).$mount('#app')
