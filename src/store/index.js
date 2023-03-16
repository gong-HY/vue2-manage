import Vue from 'vue'
import tab from './tab'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    tab
  }
})
