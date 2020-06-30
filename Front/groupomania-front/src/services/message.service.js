import axios from 'axios'
import authHeader from './auth-header'
import store from '../store'

const API_URL = 'http://localhost:3000/api/message/'

class MessageService {
  createMessage(message) {
    return axios
      .post(API_URL + '', {
        headers: authHeader(),
        title: message.title,
        content: message.content,
        idUSERS: store.state.auth.user.userId
      })
  }
}

export default new MessageService()
