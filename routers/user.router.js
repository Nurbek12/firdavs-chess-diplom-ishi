const { Router } = require('express')
const controller = require('../controllers/user.controller')

module.exports = Router()
    .get('/', controller.get_all_users)
    .get('/id/:id', controller.get_user_id)
    .post('/', controller.create_user)
    .put('/:id', controller.update_user)
    .delete('/:id', controller.delete_user)