import MessageService from '../services/message.service'

export const message = {
  namespaced: true,
  state: {
    createdMessage: { status: '' },
    modifiedMessage: { status: '' },
    deletedMessage: { status: ''},
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
    },
    modifyMessage({ commit }, payload) {
      return MessageService.modifyMessage(payload).then(
        (response) => {
          commit('modifyMessageSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('modifyMessageFailure')
          return Promise.reject(error)
        }
      )
    },
    deleteMessage({commit}, payload) {
      return MessageService.deleteMessage(payload).then(
        (response) => {
          commit ('deleteMessageSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit ('deleteMessageFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    getAllMessageSuccess(state, response) {
      state.messages = response.data.results
    },
    getAllMessageFailure() {},
    createMessageSuccess(state) {
      state.createdMessage.status = 'Posted'
    },
    createMessageFailure(state) {
      state.createdMessage.status = 'Not posted'
    },
    modifyMessageSuccess(state) {
      state.modifiedMessage.status = 'Modified'
    },
    modifyMessageFailure(state) {
      state.modifiedMessage.status = 'Not Modified'
    },
    deleteMessageSuccess(state) {
      state.deletedMessage.status = 'Deleted'
    },
    deleteMessageFailure(state) {
      state.deletedMessage.status = 'Not Deleted'
    }
  }
}
