const { TestAnswer } = require("../models/models")
const ApiError = require('../error/ApiError');

class TestAnswerController {
    async create(req, res, next){

        try{
            const {name, testQuestionId, is_right} = req.body
            const testAnswer = await TestAnswer.create({name, testQuestionId, is_right})
            return res.json(testAnswer)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        const testAnswers = await TestAnswer.findAll()
        return res.json(testAnswers)
    }

    async getOne(req, res){
        const {id} = req.params
        const testAnswer = await TestAnswer.findOne(
            {where: {id}},
        )
        return res.json(testAnswer)
    }

    async deleteOne(req, res){
        const {id} = req.params
        const testAnswer = await TestAnswer.destroy(
            {where: {id}},
        )
        return res.json(testAnswer)
    }
}

module.exports = new TestAnswerController()