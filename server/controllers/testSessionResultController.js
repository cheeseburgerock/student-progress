const ApiError = require('../error/ApiError');
const { TestSessionResult } = require('../models/models');
class TestSessionResultController {
    async create(req, res, next){

        try{
            const {testQuestionId, testAnswerId, testSessionId} = req.body
            const testSessionResult = await TestSessionResult.create({testQuestionId, testAnswerId, testSessionId})
            return res.json(testSessionResult)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        const {testQuestionId, testSessionId, testAnswerId}= req.query
        let testSessionResults;
        if (!testQuestionId && !testSessionId) {
            testSessionResults = await TestSessionResult.findAll()    
        }
        if (testQuestionId && !testSessionId) {
            testSessionResults = await TestSessionResult.findAll({where:{testQuestionId}})    
        }
        if (!testQuestionId && testSessionId) {
            testSessionResults = await TestSessionResult.findAll({where:{testSessionId}})    
        }
        if (testQuestionId && testSessionId) {
            testSessionResults = await TestSessionResult.findAll({where:{testQuestionId, testSessionId}})    
        }
        if (testAnswerId) {
            testSessionResults = await TestSessionResult.findAll({where:{testAnswerId}})    
        }
        if (testQuestionId && testSessionId && testAnswerId) {
            testSessionResults = await TestSessionResult.findAll({where:{testQuestionId, testSessionId, testAnswerId}})
        }

        if (!testQuestionId && testSessionId && testAnswerId) {
            testSessionResults = await TestSessionResult.findAll({where:{testSessionId, testAnswerId}})
        }
        return res.json(testSessionResults)
    }
        

    async getOne(req, res){
        const {id} = req.params
        const testSessionResult = await TestSessionResult.findOne(
            {where: {id}},
        )
        return res.json(testSessionResult)
    }

    async deleteOne(req, res){
        const {id} = req.params
        const testSessionResult = await TestSessionResult.destroy(
            {where: {id}},
        )
        return res.json(testSessionResult)
    }

    async updateOne(req, res){
       
        try{
            const {id}= req.query //берем id из строки запроса
            const {testQuestionId, testAnswerId, testSessionId} = req.body //получаем поля из таблицы

            let testSessionResult = await TestSessionResult.update(
                {
                    testQuestionId: testQuestionId, 
                    testAnswerId: testAnswerId,
                    testSessionId: testSessionId
                }, 
                {
                    where:{id}
                }
            )
            return res.json(testSessionResult)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


}

module.exports = new TestSessionResultController()