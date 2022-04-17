const Router = require('express')
const router = new Router()
const userController = require('../controllers/usercontroller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware ,userController.check)
router.get('/:id',)

router.post('/',userController.create)
router.get('/',userController.getAll)
router.get('/:id',userController.getOne)
router.put('/', userController.updateOne)
router.delete('/:id', userController.deleteOne)

module.exports = router
