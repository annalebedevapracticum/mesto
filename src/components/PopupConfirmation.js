import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._handleSubmit = null;
        this._buttonSubmit = this._popup.querySelector('.popup__submit');
    }

    open(handleSubmit) {
        this._handleSubmit = handleSubmit;
        super.open();
    }

    _handleSubmitClick = (e) => {
        e.preventDefault();
        this._handleSubmit();
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', this._handleSubmitClick);
    }

    close() {
        super.close();
        this._buttonSubmit.removeEventListener('click', this._handleSubmitClick);
    }
}