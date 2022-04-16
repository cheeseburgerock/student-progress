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
        
        const {testQuestionId}= req.query
        let testAnswers;
        if (!testQuestionId) {
            testAnswers = await TestAnswer.findAll()    
        }
        if (testQuestionId) {
            testAnswers = await TestAnswer.findAll({where:{testQuestionId}})    
        }
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

    async updateOne(req, res){
       
        try{
            const {id}= req.query //берем id из строки запроса
            const {name, testQuestionId, is_right} = req.body //получаем поля из таблицы

            let testAnswer = await TestAnswer.update(
                {
                    name: name, 
                    testQuestionId: testQuestionId, 
                    is_right: is_right
                }, 
                {
                    where:{id}
                }
            )
            return res.json(testAnswer)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TestAnswerController()