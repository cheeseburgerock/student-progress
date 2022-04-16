const { TestQuestion } = require("../models/models")

const ApiError = require('../error/ApiError');

class TestQuestionController {
    async create(req, res, next){
        try{
            const {name, testId} = req.body
            const testQuestion = await TestQuestion.create({name, testId})
            return res.json(testQuestion)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        const testQuestions = await TestQuestion.findAll()
        return res.json(testQuestions)
    }

    async getOne(req, res){
        const {id} = req.params
        const testQuestion = await TestQuestion.findOne(
            {where: {id}},
        )
        return res.json(testQuestion)
    }

    async deleteOne(req, res){
        const {id} = req.params
        const testQuestion = await TestQuestion.destroy(
            {where: {id}},
        )
        return res.json(testQuestion)
    }

    async updateOne(req, res){
       
        try{
            const {id}= req.query //берем id из строки запроса
            const {name, testId} = req.body //получаем поля из таблицы

            let testQuestion = await TestQuestion.update(
                {
                    name: name, 
                    testId: testId
                }, 
                {
                    where:{id}
                }
            )
            return res.json(testQuestion)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


}

module.exports = new TestQuestionController()