const express = require('express')
const router = express.Router()

const messageCtrl = require('../controllers/message')
const auth = require('../middelware/auth')
const multer = require('../middelware/multer-config')

router.post('/', auth, multer, messageCtrl.createMessage)

module.exports = router
