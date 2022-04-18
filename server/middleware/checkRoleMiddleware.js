const jwt = require('jsonwebtoken')


module.exports = function(role){
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1] //отделяем название типа токена от самого токена (Bearer)
            if (!token){
               return res.status(401).json({message: "Пользователь не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            if(decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }                              //сравнение роли пользователя с ролью из middleware

            req.user = decoded
            next()                                                  //вызов следующего middleware
        } catch (e){
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    
    }

    
}






   