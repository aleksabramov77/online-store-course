require('dotenv').config()                  // чтобы наш сервер мог считывать файл .env
const express = require('express')          // импортируем модуль Express фреймворк для написания бэкэнда на NodeJS
const sequelize = require('./db')           // импортируем ORM для реляционных БД (переводит SQL запросы в методы js)
const models = require('./models/models')   // импортируем модели таблиц
const cors = require('cors')                // импортируем CORS, чтобы мы могли отправлять запросы с браузера
const fileUpload = require('express-fileupload')    // импортируем express-fileupload, чтобы мы могли получать файлы в постзапросах
const router = require('./routes/index')    // импортируем главный роутер
const errorHandler  = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000       // считываем переменную PORT из .env

const app = express()       // создадим объект app
app.use(cors())             // чтобы мы могли отправлять запросы с браузера
app.use(express.json())     // чтобы наше приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, 'static'))) // отдавать файлы из папки static по GET запросу к корню + название файла
app.use(fileUpload({}))       // чтобы мы могли получать файлы в запросах
app.use('/api', router)     // подключаем наш роутер

// Обработка ошибок, последний MiddleWare
app.use(errorHandler)       // подключаем MiddleWare обработки ошибок обязательно в самом конце



const start = async () => {
    try {
        await sequelize.authenticate()  // подключение к БД
        await sequelize.sync()          // сверяет состояние БД со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // настраиваем прослушивание порта и солбэк который запуститься при успешном запуске сервера

    } catch (e) {
        console.log(e)
    }
}

start()

