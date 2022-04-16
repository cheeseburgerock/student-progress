const {Subject} = require('../models/models')
const ApiError = require('../error/ApiError');

class SubjectController {
    async create(req, res, next){

        try{
            const {name, description, professor} = req.body //получаем эти поля из таблицы?
            const subject = await Subject.create({name, description, professor})

            return res.json(subject)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        const subjects = await Subject.findAll()
        return res.json(subjects)
    }

    async getOne(req, res){
        const {id} = req.params
        const subject = await Subject.findOne(
            {where: {id}}
        )
        return res.json(subject)
    }

    async deleteOne(req, res){
        const {id} = req.params
        const subject = await Subject.destroy(
            {where: {id}}
        )
        return res.json(subject)
    }

    //async updateOne(req, res){
    //    const {id} = req.params
    //    const subject = await Subject.update(
    //        {where: {id}}
    //    )
    //    return res.json(subject)
    //}

    async updateOne(req, res){
       
        try{
            const {id}= req.query //берем id из строки запроса
            const {name, description, professor} = req.body //получаем поля из таблицы

            let subject = await Subject.update(
                {
                    name: name, 
                    description: description, 
                    professor: professor
                }, 
                {
                    where:{id}
                }
            )
            return res.json(subject)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


}

module.exports = new SubjectController()