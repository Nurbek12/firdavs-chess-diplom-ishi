const { Router } = require('express')
const controller = require('../controllers/auth.controller')

module.exports = Router()
    .post('/login', controller.login)
    .post('/register', controller.register)