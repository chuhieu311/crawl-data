import Vue from 'vue'
import App from './App.vue'

// import lib
import * as uiv from 'uiv'

// import JS
import './lib/script'

// import style
import './lib/css.js'

Vue.use(uiv)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')