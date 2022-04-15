const Router = require('express')
const router = new Router()
const testAnswerController = require('../controllers/testAnswerController')

router.post('/', testAnswerController.create)
router.get('/', testAnswerController.getAll)
router.get('/:id', testAnswerController.getOne)
router.delete('/:id', testAnswerController.deleteOne)



module.exports = router
