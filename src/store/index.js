import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import cart from "@/store/modules/cart";
import address from "@/store/modules/address";

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {}
  },
  getters: {
    token(state) {
      return state.user.userInfo.token
    },
    globalHistory(state) {
      return state.user.globalHistory
    },
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
    address
  }
})
