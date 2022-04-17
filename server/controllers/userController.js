const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const generateJwt = (id, email, name, role, group) => {
    return jwt.sign(
        {id, email, name, role, group}, 
        process.env.SECRET_KEY,     //или без "user.", а напрямую?
        {expiresIn: '24h'}          //токен живет 24ч
        )    
}


class UserController {
    

    async registration(req, res, next){
        const {email, password, name, role, group} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName)) //переносим файл с заданным именем в папку 


        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, name, role, group, img: fileName})
        const token = generateJwt(user.id, user.email, user.name, user.role, user.group, user.img)
            return res.json({token})  
    }
    

    async login(req, res, next){

        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Пользователь с таким email не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.name, user.role, user.group, user.img)
            return res.json({token})  
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async check(req, res, next){
       const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role, req.user.group, req.user.img)
       return res.json({token})
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
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) //переносим файл с заданным именем в папку 

            const user = await User.create({email, password, name, role, group, img: fileName})

            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res){
       
        try{
            const {id}= req.query                                           //берем id из строки запроса
            const {email, password, name, role, group} = req.body            //получаем поля из таблицы
            let fileName = uuid.v4() + ".jpg"

            let user = await User.update(
                {
                    email: email, 
                    password: password,
                    name: name,
                    role: role,
                    group: group,
                    img: fileName
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