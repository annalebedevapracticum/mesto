export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._nameBlock = document.querySelector(nameSelector);
        this._descriptionBlock = document.querySelector(descriptionSelector);

    }

    getUserInfo() {
        return {
            name: this._nameBlock.textContent,
            description: this._descriptionBlock.textContent,
        }
    }
    setUserInfo(name, description) {
        this._nameBlock.textContent = name;
        this._descriptionBlock.textContent = description;
    }
}