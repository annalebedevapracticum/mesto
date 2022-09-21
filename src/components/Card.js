export class Card {
    constructor(data, templateSelector, handleCardClick, _handleDeleteFunc, handleLike, handleRemoveLike) {
        this._data = data;
        this._element = document.querySelector(templateSelector).content.children[0].cloneNode(true);
        this._buttonDelete = this._element.querySelector('.card__delete');
        this._buttonLike = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._likeCount = this._element.querySelector('.card__like-count');
        this._handleCardClick = handleCardClick;
        this._handleDeleteFunc = _handleDeleteFunc;
        this._handleLike = handleLike;
        this._handleRemoveLike = handleRemoveLike;
        if (!this._getIsMyCard()) {
            this._buttonDelete.classList.add('card__delete-hidden');
        }
    }

    _getIsLiked = (likes) => likes.some((item) => {
        return item._id === this._data.userId;
    })

    _getIsMyCard = () => this._data.owner._id === this._data.userId;

    _handleDelete = () => {
        this._handleDeleteFunc(this._data.cardId, this._deleteElement)
    }

    _deleteElement = () => {
        this._element.remove();
        this._element = null;
    }

    _handleDeleteClick = () => {
        this._data.confirmationForm.open(this._handleDelete)
    }

    _updateLike = ({ likes }) => {
        if (this._getIsLiked(likes)) {
            this._buttonLike.classList.add('card__like_active');
        } else {
            this._buttonLike.classList.remove('card__like_active');
        }
        this._likeCount.textContent = likes.length;
    }

    _handleLikeClick = () => {
        if (this._getIsLiked(this._data.likes)) {
            this._handleRemoveLike(this._data.cardId, this._updateLike)
        } else {
            this._handleLike(this._data.cardId, this._updateLike)
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
        this._setEventListeners();
        this._updateLike(this._data);

        return this._element;
    }
}
