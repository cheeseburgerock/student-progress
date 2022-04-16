const { TestSession } = require("../models/models")
const ApiError = require('../error/ApiError');

class TestSessionController {
    async create(req, res, next){

        try{
            const {execution_date, testId, userId} = req.body

            const testSession = await TestSession.create(
                {
                    execution_date: execution_date, 
                    testId: testId, 
                    userId: userId
                }
            )
            return res.json(testSession)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        const testSessions = await TestSession.findAll()
        return res.json(testSessions)
    }

    async getOne(req, res){
        const {id} = req.params
        const testSession = await TestSession.findOne(
            {where: {id}},
        )
        return res.json(testSession)
    }

    async deleteOne(req, res){
        const {id} = req.params
        const testSession = await TestSession.destroy(
            {where: {id}},
        )
        return res.json(testSession)
    }

    async updateOne(req, res){
       
        try{
            const {id}= req.query //берем id из строки запроса
            const {execution_date, testId, userId} = req.body //получаем поля из таблицы

            let testSession = await TestSession.update(
                {
                    execution_date: execution_date, 
                    testId: testId,
                    userId: userId
                }, 
                {
                    where:{id}
                }
            )
            return res.json(testSession)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new TestSessionController()