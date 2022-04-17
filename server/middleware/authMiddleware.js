const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1] //отделяем название типа токена от самого токена
        if (!token){
           return res.status(401).json({message: "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()                                                  //вызов следующего middleware
    } catch (e){
        res.status(401).json({message: "Пользователь не авторизован"})
    }

}