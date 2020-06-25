const mysql = require('mysql')
const mysqlConfig = require('./config/mysqlPass')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'guetso',
  password: mysqlConfig.secret,
  database: 'groupomania'
})

conn.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + conn.threadId)
})

module.exports = conn
