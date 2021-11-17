const sequelize = require('../db')
const { DataTypes } = require('sequelize')    // класс DataTypes для описания типов полей БД

// Описываем модели
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
})

const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Basket)     // У одного пользолвателя одна корзина
Basket.belongsTo(User)  // Корзина принадлежит пользователю

User.hasMany(Rating)    // Один пользователь может сделать несколько оценок
Rating.belongsTo(User)  // Оценка принадлежит пользователю

Basket.hasMany(BasketDevice)    // В корзине пользователя могут находиться товары
BasketDevice.belongsTo(Basket)  // Товары находящиеся в корзине принадлежат корзине пользователя

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

BasketDevice.hasMany(Device)     // !!!!!!! Товар, находящийся в корзине ссылается на реальное устройство которое есть в магазине
Device.belongsTo(BasketDevice)  // Товары находящиеся в корзине принадлежат корзине пользователя

Device.hasMany(Rating)    // Один товар может иметь несколько оценок
Rating.belongsTo(Device)  // Оценка принадлежит товару

Device.hasMany(DeviceInfo, {as: 'info'})    // Один товар может иметь несколько характеристик
DeviceInfo.belongsTo(Device)  // Характеристика принадлежит товару

Type.belongsToMany(Brand, {through: TypeBrand}) // при связи many-to-many необходима промежуточная таблица связи
Brand.belongsToMany(Type, {through: TypeBrand}) // при связи many-to-many необходима промежуточная таблица связи


module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo,
    TypeBrand
}




