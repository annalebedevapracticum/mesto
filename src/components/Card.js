export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._element = document.querySelector(templateSelector).content.children[0].cloneNode(true);
        this._buttonDelete = this._element.querySelector('.card__delete');
        this._buttonLike = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._handleCardClick = handleCardClick;
    }
    _handleDelete = () => {
        this._element.remove();
        this._element = null;
    }
    _handleLike = () => {
        this._buttonLike.classList.toggle('card__like_active');
    }
    _handleOpen = () => {
        const { src, name } = this._data;
        this._handleCardClick(src, name);

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
