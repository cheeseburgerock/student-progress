const ApiError = require('../error/ApiError');
const { User } = require('../models/models');

class UserController {
    async registration(req, res){

    }

    async login(req, res){

    }

    async check(req, res, next){
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Field ID is not set'))
        }
        res.json(id);
    }






    async getAll(req, res){
        const users = await User.findAll()
        return res.json(users)
    }

    async getOne(req, res){
        const {id} = req.params
        const user = await User.findOne(
            {where: {id}},
        )
        return res.json(user)
    }

    async create(req, res, next){

        try{
            const {email, password, name, role, group} = req.body
            const user = await User.create({email, password, name, role, group})
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res){
       
        try{
            const {id}= req.query                                           //берем id из строки запроса
            const {email, password, name, role, group} = req.body            //получаем поля из таблицы

            let user = await User.update(
                {
                    email: email, 
                    password: password,
                    name: name,
                    role: role,
                    group: group
                }, 
                {
                    where:{id}
                }
            )
            return res.json(user)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res){
        const {id} = req.params
        const user = await User.destroy(
            {where: {id}},
        )
        return res.json(user)
    }

}

module.exports = new UserController()