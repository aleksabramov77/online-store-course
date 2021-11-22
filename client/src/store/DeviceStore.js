import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
    constructor () {
        this._types = [
            { id: 1, name: 'Холодильники' },
            { id: 2, name: 'Смарфона' },
            { id: 3, name: 'Ноутбуки' },
            { id: 4, name: 'Телевизоры' },
        ]
        this._brands = [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Samsung' },
            { id: 3, name: 'Sony' },
            { id: 4, name: 'Lenovo' },
            { id: 5, name: 'Asus' },
            { id: 6, name: 'Xiaomi' },
            { id: 7, name: 'JVC' },
            { id: 8, name: 'Tesla' },
            { id: 9, name: 'Nokia' },
            { id: 10, name: 'Motorola' },
            { id: 11, name: 'Google' },
            { id: 12, name: 'Amazon' },
        ]
        this._devices = [
            { id: 1, name: '12 pro', price: 100000, rating: 0, img: '4adf7909-9a7c-45b6-a27a-16ad680c37be.jpg' },
            { id: 2, name: 'RB38T676FWW', price: 59000, rating: 0, img: 'd37bbc7c-acfd-4adf-b8f6-385a74da82e0.jpg' },
            { id: 3, name: '13 pro', price: 130000, rating: 0, img: '4adf7909-9a7c-45b6-a27a-16ad680c37be.jpg' },
            { id: 4, name: 'RB38T676FWW', price: 59000, rating: 0, img: 'd37bbc7c-acfd-4adf-b8f6-385a74da82e0.jpg' },
            { id: 3, name: '13 pro', price: 130000, rating: 0, img: '4adf7909-9a7c-45b6-a27a-16ad680c37be.jpg' },
            { id: 4, name: 'RB38T676FWW', price: 59000, rating: 0, img: 'd37bbc7c-acfd-4adf-b8f6-385a74da82e0.jpg' },
            { id: 3, name: '13 pro', price: 130000, rating: 0, img: '4adf7909-9a7c-45b6-a27a-16ad680c37be.jpg' },
            { id: 4, name: 'RB38T676FWW', price: 59000, rating: 0, img: 'd37bbc7c-acfd-4adf-b8f6-385a74da82e0.jpg' },
            { id: 3, name: '13 pro', price: 130000, rating: 0, img: '4adf7909-9a7c-45b6-a27a-16ad680c37be.jpg' },
            { id: 4, name: 'RB38T676FWW', price: 59000, rating: 0, img: 'd37bbc7c-acfd-4adf-b8f6-385a74da82e0.jpg' },

        ]
        this._selectedType = {}
        this._selectedBrand = {}

        makeAutoObservable(this)
    }

    /* Setters */

    setTypes (types) {
        this._types = types
    }

    setBrands (brands) {
        this._brands = brands
    }

    setDevices (devices) {
        this._devices = devices
    }

    setSelectedType (type) {
        this._selectedType = type
    }

    setSelectedBrand (brand) {
        this._selectedBrand = brand
    }

    /* Getters, computed functions (are called if variables was changed) */

    get types () {
        return this._types
    }

    get brands () {
        return this._brands
    }

    get devices () {
        return this._devices
    }

    get selectedType () {
        return this._selectedType
    }

    get selectedBrand () {
        return this._selectedBrand
    }

}