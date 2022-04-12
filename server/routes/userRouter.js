const Router = require('express')
const router = new Router()
const userController = require('../controllers/usercontroller')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)
router.get('/:id',)

module.exports = router
