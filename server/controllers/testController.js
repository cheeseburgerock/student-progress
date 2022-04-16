const { Test } = require("../models/models")
const ApiError = require('../error/ApiError');
class TestController {
    async create(req, res, next){

        try{
            const {name, description, subjectId} = req.body
            const test = await Test.create({name, description, subjectId})
            return res.json(test)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const {subjectId}= req.query
        let tests;
        if (!subjectId) {
            tests = await Test.findAll()    
        }
        if (subjectId) {
            tests = await Test.findAll({where:{subjectId}})    
        }
        return res.json(tests)
    }

    async getOne(req, res){
        const {id} = req.params
        const test = await Test.findOne(
            {where: {id}},
        )
        return res.json(test)
    }

    async deleteOne(req, res){
        const {id} = req.params
        const test = await Test.destroy(
            {where: {id}},
        )
        return res.json(test)
    }

    async updateOne(req, res){
       
        try{
            const {id}= req.query //берем id из строки запроса
            const {name, description, subjectId} = req.body //получаем поля из таблицы

            let test = await Test.update(
                {
                    name: name, 
                    description: description, 
                    subjectId: subjectId
                }, 
                {
                    where:{id}
                }
            )
            return res.json(test)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new TestController()