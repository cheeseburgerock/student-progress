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
        const tests = await Test.findAll()
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

}

module.exports = new TestController()