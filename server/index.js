require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT =  process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)



//Обработка ошибок (должна быть в конце)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate() //ф-я подключения БД
        await sequelize.sync() //сверяет данные БД и схемой БД
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()