const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')


router.post('/registration',userController.registration)   // регистрация нового пользователя
router.post('/login', userController.login)  // логин
router.get('/auth', userController.check)    // вход по JWT токену

module.exports = router