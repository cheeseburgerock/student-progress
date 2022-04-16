require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT =  process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload(({})))
app.use('/api', router)


app.use(errorHandler) //Обработка ошибок (должна быть в конце)




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