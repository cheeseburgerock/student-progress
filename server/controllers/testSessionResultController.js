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
        const testSessionResults = await TestSessionResult.findAll()
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

}

module.exports = new TestSessionResultController()