import Vue from 'vue'
import Vuex from 'vuex'
import error from './error' // ★ 追加

import auth from './auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth
    error // ★ 追加
  }
})

export default store
