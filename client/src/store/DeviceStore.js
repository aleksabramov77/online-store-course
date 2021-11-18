import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
    constructor () {
        this._types = [
            {id:1, type: 'Холодильники'},
            {id:2, type: 'Смарфона'},
            {id:5, type: 'Ноутбуки'},
            ]
        this._types = [
            {id:1, type: 'Apple'},
            {id:2, type: 'Samsung'},
            ]
        this._devices = [
            {id:1, name: '12 pro', price: 100000, rating: 0, img: '4adf7909-9a7c-45b6-a27a-16ad680c37be.jpg'},
            {id:2, name: 'RB38T676FWW', price: 59000, rating: 0, img: 'd37bbc7c-acfd-4adf-b8f6-385a74da82e0.jpg'},

        ]
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

}