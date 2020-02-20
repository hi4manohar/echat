import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fb from './db/firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

let app

fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount(`#app`)
  }
})
