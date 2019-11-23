import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

Vue.config.productionTip = false;

import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    buses: []
  },
  mutations: {
    updatebuses(state, payload) {
      state.buses = [...payload];
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
