import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { mestoConfig, buttonEdit, cardsSection, formAdd, formEdit, profileAddButton, avatarButton, formAvatar } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-50',
    updateUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
        authorization: 'b4e2c2b5-478c-44a2-8411-ea93c0b3b5ee',
        'Content-Type': 'application/json'
    }
});

export const imagePopupForm = new PopupWithImage('.popup-image');
const cardAddForm = new FormValidator(mestoConfig, formAdd);
const profileEditForm = new FormValidator(mestoConfig, formEdit);
const avatarForm = new FormValidator(mestoConfig, formAvatar);
const confirmationForm = new PopupConfirmation('.popup-confirmation');

cardAddForm.enableValidation();
profileEditForm.enableValidation();

const profileInfo = new UserInfo({ nameSelector: ".profile__name", descriptionSelector: ".profile__description", imageSelector: ".profile__avatar" });

const handleCardClick = (src, name) => imagePopupForm.open(src, name);
const handleDeleteRequest = (cardId, removeElementCallback) => {
    api.removeCard(cardId)
        .then(removeElementCallback)
        .catch((error) => console.log(`Ошибка: ${error}`));
};

const handleLike = (cardId, updateLikeBlockCallback) => {
    api.likeCard(cardId)
        .then(updateLikeBlockCallback)
        .catch((error) => console.log(`Ошибка: ${error}`));
}
const handleRemoveLike = (cardId, updateLikeBlockCallback) => {
    api.deleteCardLike(cardId)
        .then(updateLikeBlockCallback)
        .catch((error) => console.log(`Ошибка: ${error}`));
}

const handleOpenConfirmationForm = (handleDeleteCallback) => {
    confirmationForm.open(handleDeleteCallback);
}

function createCard(src, name, likes, owner, cardId) {
    const userId = profileInfo.getUserInfo()._id;
    const card = new Card({
        userId,
        likes,
        name,
        src,
        owner,
        cardId,
    }, '.card-template', handleCardClick, handleDeleteRequest, handleLike, handleRemoveLike, handleOpenConfirmationForm);

    return card.generateCard();
}

const cardList = new Section({
    renderer: (item) => {
        const { link, name, likes, owner } = item;
        const card = createCard(link, name, likes, owner, item._id);
        cardList.setItem(card);
    }
}, '.cards');

const handleEditSubmit = ({ name, about }, closeCallback) => {
    return api.updateProfileInfo(name, about).then(({ name, about }) => {
        profileInfo.setUserInfo({ name, about });
    }).then(closeCallback).catch((error) => console.log(`Ошибка: ${error}`));
}
const handleUpdateAvatarSubmit = ({ avatar }, closeCallback) => {
    return api.updateAvatar(avatar).then(() => {
        profileInfo.setUserInfo({ avatar });
    }).then(closeCallback).catch((error) => console.log(`Ошибка: ${error}`));
}
const handleAddSubmit = ({ name, link }, closeCallback) => {
    const userId = profileInfo.getUserInfo()._id;
    return api.addCard(name, link).then(({ name, link, likes, _id, owner }) => {
        const isLiked = !!likes.find((item) => {
            return item._id === userId;
        })
        const card = createCard(link, name, likes, owner, _id);
        cardAddForm.toggleButtonState();
        cardList.addToStart(card);
        formAdd.reset();
    }).then(closeCallback).catch((error) => console.log(`Ошибка: ${error}`));
}

export const popupEditForm = new PopupWithForm('.popup-info', handleEditSubmit);
export const popupAddCardForm = new PopupWithForm('.popup-add-card', handleAddSubmit);
export const avatarPopupForm = new PopupWithForm('.popup-avatar', handleUpdateAvatarSubmit);

buttonEdit.addEventListener('click', function () {
    const { name, about } = profileInfo.getUserInfo();
    popupEditForm.open({ name, about });
    profileEditForm.resetValidation();
});
profileAddButton.addEventListener('click', function () {
    popupAddCardForm.open({});
    cardAddForm.resetValidation();
});

avatarButton.addEventListener('click', function () {
    const { avatar } = profileInfo.getUserInfo();
    avatarPopupForm.open({ avatar });
    avatarForm.resetValidation();
});

Promise.all([api.getUserInfo(), api.getCardsInfo()]).then(([{ name, about, _id, avatar }, data]) => {
    profileInfo.setUserInfo({ name, about, _id, avatar });

    cardList.renderItems(data);
}).catch((error) => console.log(`Ошибка: ${error}`))
