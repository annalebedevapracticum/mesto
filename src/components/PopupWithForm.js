import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__inputs');
        this._buttonSubmit = this._popup.querySelector('.popup__submit');
    }
    _getInputValues = () => {
        return Array.from(this._inputList).map(input => input.value);
    }

    open(initialValues) {
        super.open();
        initialValues.forEach((value, index) => {
            this._inputList[index].value = value;
        })
    }

    _handleSubmitClick = () => {
        this._handleSubmit(this._getInputValues());
        this.close();
    }

    setEventListeners () {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', this._handleSubmitClick);
    }

    close () {
        super.close();
        this._buttonSubmit.removeEventListener('click', this._handleSubmitClick);
    }
}