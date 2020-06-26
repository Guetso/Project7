import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/auth'

import { USER_REQUEST } from '../actions/user'

const axios = require('axios')

const state = {
  token: localStorage.getItem('user-token') || '',
  userId: localStorage.getItem('user-id') || '',
  status: '',
}

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  userId: (state) => state.userId
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      axios({
        url: 'http://localhost:3000/api/auth/login',
        data: user,
        method: 'POST',
      })
        .then((res) => {
          const token = res.data.token
          localStorage.setItem('user-token', token)
          const userId = res.data.userId
          localStorage.setItem('user-id', userId)
          axios.defaults.headers.common['Authorization'] = token
          commit(AUTH_SUCCESS, token)
          dispatch(USER_REQUEST)
          resolve(res)
        })
        .catch((error) => {
          commit(AUTH_ERROR, error)
          localStorage.removeItem('user-token')
          reject(error)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      delete axios.defaults.headers.common['Authorisation']
      resolve()
    })
  },
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
