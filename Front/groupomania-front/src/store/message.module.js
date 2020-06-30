import MessageService from '../services/message.service'

export const message = {
  namespaced: true,
  state: {
    createdMessage: {status: ''},
    messages: ''
  },
  actions: {
    getAllMessage({ commit }) {
      return MessageService.getAllMessage().then(
        (response) => {
          commit('getAllMessageSuccess', response)
          return Promise.resolve(response)
        },
        (error) => {
          commit('getAllMessageFailure')
          return Promise.reject(error)
        }
      )
    },
    createMessage({ commit }, message) {
      return MessageService.createMessage(message).then(
        (response) => {
          commit('createMessageSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('createMessageFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    getAllMessageSuccess(state, response) {
      state.messages = (response.data.results)
    },
    getAllMessageFailure() {
   
    },
    createMessageSuccess(state) {
      state.createdMessage.status='Posted'
    },
    createMessageFailure(state) {
      state.createdMessage.status='Not posted'
    }
  }
}
