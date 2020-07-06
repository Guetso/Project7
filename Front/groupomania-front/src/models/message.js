export default class Message {
  constructor(title, content, message_parent, userId, username) {
    this.title = title
    this.content = content
    this.message_parent = message_parent
    this.userId = userId
    this.username = username
  }
}
