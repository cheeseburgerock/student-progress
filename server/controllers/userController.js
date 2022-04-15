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

    async getOne(req, res){

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

    async getAll(req, res){
        const users = await User.findAll()
        return res.json(users)
    }


}

module.exports = new UserController()