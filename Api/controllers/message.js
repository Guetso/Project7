/* const fs = require('fs') */
const conn = require('../mysqlConfig')

exports.createMessage = (req, res, next) => {
  const message = req.body
  conn.query('INSERT INTO messages SET ?', message, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({ message: 'Votre message a bien été posté !' })
  })
}

exports.getAllMessages = (req, res, next) => {
  conn.query('SELECT * FROM groupomania.messages', function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    console.log(results)
    return res.status(200).json({ results })
  })
}
