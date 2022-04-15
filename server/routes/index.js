const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const subjectRouter = require('./subjectRouter')
const testRouter = require('./testRouter')
const testQuestionRouter = require('./testQuestionRouter')
const testAnswerRouter = require('./testAnswerRouter')
const testSessionRouter = require('./testSessionRouter')
const testSessionResultRouter = require('./testSessionResultRouter')

router.use('/user', userRouter)
router.use('/subject', subjectRouter)
router.use('/test', testRouter)
router.use('/testQuestion', testQuestionRouter)
router.use('/testAnswer', testAnswerRouter)
router.use('/testSession',testSessionRouter)
router.use('/testSessionResult',testSessionResultRouter)

module.exports = router
