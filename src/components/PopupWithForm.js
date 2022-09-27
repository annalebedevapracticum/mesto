import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__inputs');
        this._buttonSubmit = this._popup.querySelector('.popup__submit');
        this._form = this._popup.querySelector('form');
        this._defaultButtonText = this._buttonSubmit.textContent;
    }
    _getInputValues = () => {
        const values = {};
        this._inputList.forEach(item => values[item.name] = item.value);
        return values;
    }

    open(initialValues) {
        super.open();
        this._buttonSubmit.textContent = this._defaultButtonText;
        Object.keys(initialValues).forEach((key) => {
            const currentInput = Array.from(this._inputList).find(item => item.name == key);
            currentInput.value = initialValues[key];
        })
    }

    _handleSubmitClick = (e) => {
        e.preventDefault();
        this._buttonSubmit.textContent = "Сохранение..."
        this._handleSubmit(this._getInputValues(), this.close);
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', this._handleSubmitClick);
    }

    close = () => {
        this._form.reset();
        super.close();
        this._buttonSubmit.removeEventListener('click', this._handleSubmitClick);
    }
}