export class Api { 
    #onResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }
    //отображаем карточки с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then(this.#onResponse)    
    }

    getAllUnfo() {
        return Promise.all([this.getInitialCards(), this.getInfoUser()])
    }

    
    //добавляем новую карточку
    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }) 
        })
        .then(this.#onResponse)
    } 

    //удаление карточки
    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    //редактирование инфо профиля
    editInfoUser(name, job) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
        .then(this.#onResponse)
    } 

    //загрузка информации о пользователе
    getInfoUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this.#onResponse)
    } 

    //обновдение аватара
    patchAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
        avatar: avatar
        })
        })
        .then(this.#onResponse)
    }

    //ставим лайк
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    //Удаляем лайк
    remLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method:"DELETE",
            headers: this._headers
        })
        .then(this.#onResponse)
    }
}


