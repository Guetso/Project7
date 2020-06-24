const conn = require('../mysqlConfig')

exports.signup = (req, res, next) => {
  const user = req.body.user

  conn.query('INSERT INTO users SET ?', user, function (error, results, fields) {
    if (error) { // Si erreur de la requête
      console.log(error) // La console du serveur affiche l'erreur
      return res.status(400).json(error.sqlMessage)} // Et retourne uniquement le message de l'erreur au front
    return res.status(201).json({message: 'Bienvenue ! Vous pouvez maintenant vous connecter.'})
  })
}
