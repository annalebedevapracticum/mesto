import { openForm, popupImage, popupImageText, imagePopupForm } from "./index.js";

export class Card {
    constructor(data, templateSelector) {
        this._data = data;
        this._element = document.querySelector(templateSelector).content.cloneNode(true);
        this._buttonDelete = this._element.querySelector('.card__delete');
        this._buttonLike = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
    }
    _handleDelete = (evt) => {
        evt.target.closest('.card').remove();
    }
    _handleLike = () => {
        this._buttonLike.classList.toggle('card__like_active');
    }
    _handleOpen = () => {
        openForm(imagePopupForm);
        popupImage.src = this._data.src;
        popupImage.alt = this._data.name;
        popupImageText.textContent = this._data.name;
    }
    generateCard() {
        this._cardImage.src = this._data.src;
        this._cardImage.alt = this._data.name;
        this._cardTitle.textContent = this._data.name;

        this._cardImage.addEventListener('click', this._handleOpen);
        this._buttonDelete.addEventListener('click', this._handleDelete);
        this._buttonLike.addEventListener('click', this._handleLike);

        return this._element;
    }
}
