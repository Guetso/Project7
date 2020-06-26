import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
      { id: 100, name: 'hh', firstName: 'gg' },
      { id: 101, name: 'ff', firstName: 'jj' },
    ],
  },
  mutations: {}, // change l'état de isLoggin en true 
  actions: {}, //je créer action qui va call service back pour auth, réponse de l'api, then: mutation
  getters: {
    getUser: state => (id) => {
      return state.users[id]
    },
  },
  modules: {},
})
