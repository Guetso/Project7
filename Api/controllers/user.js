const mysql = require('mysql')
const mysqlConfig = require('../config/mysqlConfig')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'guetso',
  password: mysqlConfig.secret,
  database: 'groupomania',
})

exports.signup = (req, res, next) => {
  const user = req.body.user

  connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
    if (error) throw error
    return res.status(201).send({data: results, message: 'New user created !'})
  })
}
