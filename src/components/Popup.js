export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close');
    }

    open () {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    _handleOverlayClick = (event) => {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }

    _handleCloseClick = () => {
        this.close();
    }

    close () {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClick);
        this._buttonClose.removeEventListener('click', this._handleCloseClick);
    }
    setEventListeners () {
        this._buttonClose.addEventListener('click', this._handleCloseClick);
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClick);
    }
    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }
}