const Router = require('express')
const router = new Router()
const testQuestionController = require('../controllers/testQuestionController')

router.post('/', testQuestionController.create)
router.get('/', testQuestionController.getAll)
router.get('/:id', testQuestionController.getOne)
router.delete('/:id', testQuestionController.deleteOne)


module.exports = router
