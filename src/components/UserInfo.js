export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, imageSelector }) {
        this._nameBlock = document.querySelector(nameSelector);
        this._descriptionBlock = document.querySelector(descriptionSelector);
        this._imageBlock = document.querySelector(imageSelector);
        this._id = null;
        this._avatar = null;
    }

    getUserInfo() {
        return {
            name: this._nameBlock.textContent,
            about: this._descriptionBlock.textContent,
            id: this._id,
            avatar: this._avatar
        }
    }
    setUserInfo({ name, about, _id, avatar }) {
        if (name) {
            this._nameBlock.textContent = name;
        }
        if (about) {
            this._descriptionBlock.textContent = about;
        }
        if (_id) {
            this._id = _id;
        }
        if (avatar) {
            this._avatar = avatar;
            this._imageBlock.src = avatar;
        }
    }
}