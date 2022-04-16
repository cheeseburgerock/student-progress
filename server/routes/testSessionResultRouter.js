const Router = require('express')
const router = new Router()
const testSessionResultController = require('../controllers/testSessionResultController')

router.post('/',testSessionResultController.create)
router.get('/',testSessionResultController.getAll)
router.get('/:id',testSessionResultController.getOne)
router.delete('/:id', testSessionResultController.deleteOne)
router.put('/', testSessionResultController.updateOne)


module.exports = router
