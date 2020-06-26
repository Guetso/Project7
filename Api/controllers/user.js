const conn = require('../mysqlConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwt.secret')

exports.signup = (req, res, next) => {
  const user = req.body.user
  bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash
    conn.query('INSERT INTO users SET ?', user, function (
      error,
      results,
      fields
    ) {
      if (error) {
        // Si erreur de la requête
        console.log(error) // La console du serveur affiche l'erreur
        return res.status(400).json(error.sqlMessage)
      } // Et retourne uniquement le message de l'erreur au front
      return res.status(201).json({
        message:
          'Votre compte a bien été créé ! Vous pouvez maintenant vous connecter.'
      })
    })
  })
}

exports.login = (req, res, next) => {
  const userReq = req.body.user.userName
  const passReq = req.body.user.password
  if (userReq && passReq) {
    conn.query(
      'SELECT * FROM groupomania.users WHERE username= ?',
      userReq,
      function (_error, results, _fields) {
        if (results.length > 0) {
          bcrypt.compare(passReq, results[0].password).then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: 'Utilisateur ou mot de passe inconnu' })
            } else {
              res.status(200).json({
                message: 'Bienvenue dans votre espace !',
                userId: results[0].idUSERS,
                token: jwt.sign(
                  { userId: results[0].idUSERS },
                  jwtSecret.secret,
                  { expiresIn: '24h' }
                )
              })
            }
          })
        } else {
          res
            .status(401)
            .json({ message: 'Utilisateur ou mot de passe inconnu' })
        }
      }
    )
  } else {
    res
      .status(500)
      .json({ message: "Entrez un nom d'utilisateur et un mot de passe" })
  }
}
