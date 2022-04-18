const Router = require('express')
const router = new Router()
const subjectController = require('../controllers/subjectController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), subjectController.create)
router.get('/', subjectController.getAll)
router.get('/:id', subjectController.getOne)
router.put('/', subjectController.updateOne)
router.delete('/:id', subjectController.deleteOne)

module.exports = router
