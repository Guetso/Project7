const conn = require('../mysqlConfig')

exports.signup = (req, res, next) => {
  const user = req.body.user

  conn.query('INSERT INTO users SET ?', user, function (error, results, fields) {
    if (error) throw error
    return res.status(201).send({data: results, message: 'New user created !'})
  })
}
