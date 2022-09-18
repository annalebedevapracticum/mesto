export class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteRequest, handleLike, handleRemoveLike) {
        this._data = data;
        this._element = document.querySelector(templateSelector).content.children[0].cloneNode(true);
        this._buttonDelete = this._element.querySelector('.card__delete');
        this._buttonLike = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._likeCount = this._element.querySelector('.card__like-count');
        this._handleCardClick = handleCardClick;
        this._handleDeleteRequest = handleDeleteRequest;
        this._handleLike = handleLike;
        this._handleRemoveLike = handleRemoveLike;
        if (!this._data.hasDelete) {
            this._buttonDelete.classList.add('card__delete-hidden');
        }
    }

    _handleDelete = () => {
        this._handleDeleteRequest(this._data.cardId).then(() => {
            this._element.remove();
            this._element = null;
        })
    }

    _handleDeleteClick = () => {
        this._data.confirmationForm.open(this._handleDelete)
    }

    _updateLike = (data) => {
        this._buttonLike.classList.toggle('card__like_active');
        this._likeCount.textContent = data.likes.length;
    }

    _handleLikeClick = () => {
        if (this._data.isLiked) {
            this._handleRemoveLike(this._data.cardId).then(this._updateLike)
        } else {
            this._handleLike(this._data.cardId).then(this._updateLike)
        }
    }

    _handleOpen = () => {
        const { src, name } = this._data;
        this._handleCardClick(src, name);

    }
    _setEventListeners() {
        this._cardImage.addEventListener('click', this._handleOpen);
        this._buttonDelete.addEventListener('click', this._handleDeleteClick);
        this._buttonLike.addEventListener('click', this._handleLikeClick);

    }
    generateCard() {
        this._cardImage.src = this._data.src;
        this._cardImage.alt = this._data.name;
        this._cardTitle.textContent = this._data.name;
        this._likeCount.textContent = this._data.likeCount;
        this._setEventListeners();

        if (this._data.isLiked) {
            this._buttonLike.classList.add('card__like_active');
        }

        return this._element;
    }
}
