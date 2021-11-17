const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create (req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            const fileName = uuid.v4() + '.jpg'   // создаём имя для файла изображения
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))   // перемещаем файл-изображение в папку static и присваиваем имя filename
            const device = await Device.create({ name, price, brandId, typeId, img: fileName }) // отправляем данные в БД

            if (info) {
                info = JSON.parse(info) // парсим строку в json объект
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })  // Добавляем описание товара в таблицу DeviceInfo
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId) {
            // devices = await Device.findAll({ limit, offset })    //findAll вернуть все записи из БД (лимит вывода, сдвиг вывода)
            devices = await Device.findAndCountAll({ limit, offset })   //findAndCountAll (для пагинации) вернуть объект {count: общее число записей из БД, rows: [записи из БД]} (лимит вывода, сдвиг вывода)
        }
        if (brandId && !typeId) {
            // devices = await Device.findAll({ where: { brandId },limit, offset })
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            // devices = await Device.findAll({ where: { typeId },limit, offset })
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            // devices = await Device.findAll({ where: { brandId, typeId },limit, offset })
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
        }
        return res.json(devices)

    }

    async getOne (req, res) {
        const { id } = req.params // получаем id из query-параметров '/:id' http://localhost:5000/api/device/555 <- id=555
        const device = await Device.findOne({
                where: { id },
                include: [{
                    model: DeviceInfo,
                    as: 'info'
                }]   // т.к. такой запрос используется для получения инфы об одном товаре, то сразу же подкружаем хар-ки товара
            }
        )
        return res.json(device)

    }
}

module.exports = new DeviceController()