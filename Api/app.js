const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/user')

const mysqlConfig = require('./config/mysqlConfig')

const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'guetso',
  password: mysqlConfig.secret,
  database: 'groupomania',
})

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

/* connection.query('INSERT INTO users (email, username, password, isAdmin) VALUES (?,?,?,?)', ['h@g.com', 'guetso', 'pwd', 0]) */
 
/* connection.query('SELECT * FROM users', function (error, results, fields){
  console.log(results)
})
 */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use(bodyParser.json())

app.use('/api/auth', userRoutes)

module.exports = app
