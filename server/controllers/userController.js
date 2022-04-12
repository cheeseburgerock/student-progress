const ApiError = require('../error/ApiError')

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
}

module.exports = new UserController()