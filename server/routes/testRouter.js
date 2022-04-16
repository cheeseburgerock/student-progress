const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')

router.post('/', testController.create)
router.get('/', testController.getAll)
router.get('/:id', testController.getOne)
router.delete('/:id', testController.deleteOne)
router.put('/', testController.updateOne)


module.exports = router
