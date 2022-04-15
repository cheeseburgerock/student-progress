const Router = require('express')
const router = new Router()
const testSessionController = require('../controllers/testSessionController')

router.post('/',testSessionController.create)
router.get('/',testSessionController.getAll)
router.get('/:id',testSessionController.getOne)
router.delete('/:id', testSessionController.deleteOne)


module.exports = router
