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
        return Array.from(this._inputList).map(input => input.value);
    }

    open(initialValues) {
        super.open();
        this._buttonSubmit.textContent = this._defaultButtonText;
        initialValues.forEach((value, index) => {
            this._inputList[index].value = value;
        })
    }

    _handleSubmitClick = (e) => {
        e.preventDefault();
        this._buttonSubmit.textContent = "Сохранение..."
        this._handleSubmit(this._getInputValues()).then(() => {
            this.close();
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', this._handleSubmitClick);
    }

    close() {
        this._form.reset();
        super.close();
        this._buttonSubmit.removeEventListener('click', this._handleSubmitClick);
    }
}