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

exports.replyMessage = (req, res, next) => {
  const message = req.body
  conn.query('INSERT INTO messages SET ?', message, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({ message: 'Votre réponse a bien été posté !' })
  })
}

exports.getAllMessages = (req, res, next) => {
  conn.query('SELECT * FROM groupomania.messages ORDER BY created_at DESC', function (
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

exports.modifyMessage = (req, res, next) => {
  const updatedMessage = req.body
  conn.query(
    `UPDATE messages SET ? WHERE idMESSAGES=${req.params.id}`,
    updatedMessage,
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res
        .status(200)
        .json({ message: 'Votre message a bien été modifié !' })
    }
  )
}

exports.deleteMessage = (req, res, next) => {
  conn.query(
    `DELETE FROM messages WHERE idMESSAGES=${req.params.id}`,
    req.params.id,
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res
        .status(200)
        .json({ message: 'Votre message a bien été supprimé !' })
    }
  )
}
