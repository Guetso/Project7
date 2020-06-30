import axios from 'axios'
import authHeader from './auth-header'
import store from '../store'

const API_URL = 'http://localhost:3000/api/messages/'

class MessageService {
  createMessage(message) {
    return axios.post(
      API_URL + '',
      {
        title: message.title,
        content: message.content,
        idUSERS: store.state.auth.user.userId
      },
      { headers: authHeader() }
    )
  }

  getAllMessage() {
    return axios.get(API_URL + '', { headers: authHeader() })
  }
}

export default new MessageService()
