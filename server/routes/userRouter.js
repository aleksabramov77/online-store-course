const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration',userController.registration)   // регистрация нового пользователя
router.post('/login', userController.login)  // логин
router.get('/auth', authMiddleware, userController.check)    // вход по JWT токену

module.exports = router