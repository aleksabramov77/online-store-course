import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor () {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    /* Setters */

    setIsAuth (bool) {
        this._isAuth = bool
    }
    setUser (user) {
        this._user = user
    }


    /* Getters, computed functions (are called if variables was changed) */

    get isAuth () {
        return this._isAuth
    }
    get user () {
        return this._user
    }

}