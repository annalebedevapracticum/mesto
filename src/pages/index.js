import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { mestoConfig, initialCards, buttonEdit, cardsSection, formAdd, formEdit, profileAddButton, avatarButton, formAvatar } from "../utils/constants.js";
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
const addCardForm = new FormValidator(mestoConfig, formAdd);
const editProfileForm = new FormValidator(mestoConfig, formEdit);
const avatarForm = new FormValidator(mestoConfig, formAvatar);
const confirmationForm = new PopupConfirmation('.popup-confirmation');

addCardForm.enableValidation();
editProfileForm.enableValidation();

const profileInfo = new UserInfo({ nameSelector: ".profile__name", descriptionSelector: ".profile__description", imageSelector: ".profile__avatar" });

const handleCardClick = (src, name) => imagePopupForm.open(src, name);
const handleDeleteRequest = (cardId) => {
    return api.removeCard(cardId);
};

function createCard(src, name, likeCount, hasDelete, cardId, isLiked) {
    const card = new Card({
        likeCount,
        name,
        src,
        hasDelete,
        cardId,
        isLiked,
        confirmationForm
    }, '.card-template', handleCardClick, handleDeleteRequest, api.likeCard, api.deleteCardLike);

    return card.generateCard();
}

const handleEditSubmit = ([name, description]) => {
    return api.updateProfileInfo(name, description).then(({ name, about }) => {
        profileInfo.setUserInfo({ name, about });
    });
}
const handleUpdateAvatarSubmit = ([avatar]) => {
    return api.updateAvatar(avatar).then(() => {
        profileInfo.setUserInfo({ avatar });
    });
}
const handleAddSubmit = ([name, src]) => {
    const userId = profileInfo.getUserInfo().id;
    return api.addCard(name, src).then(({ name, link, likes, _id }) => {
        const isLiked = !!likes.find((item) => {
            return item._id === userId;
        })
        const card = createCard(link, name, likes.length, true, _id, isLiked);
        addCardForm.toggleButtonState();
        cardsSection.prepend(card);
        formAdd.reset();
    })
}

export const editPopupForm = new PopupWithForm('.popup-info', handleEditSubmit);
export const addCardPopupForm = new PopupWithForm('.popup-add-card', handleAddSubmit);
export const avatarPopupForm = new PopupWithForm('.popup-avatar', handleUpdateAvatarSubmit);

buttonEdit.addEventListener('click', function () {
    const { name, about } = profileInfo.getUserInfo();
    editPopupForm.open([name, about]);
    editProfileForm.resetValidation();
});
profileAddButton.addEventListener('click', function () {
    addCardPopupForm.open([]);
    addCardForm.resetValidation();
});

avatarButton.addEventListener('click', function () {
    avatarPopupForm.open([profileInfo.getUserInfo().avatar]);
    avatarForm.resetValidation();
});


api.getUserInfo().then(({ name, about, _id, avatar }) => {
    profileInfo.setUserInfo({ name, about, _id, avatar });
    api.getCardsInfo().then(data => {
        const cardList = new Section({
            items: data,
            renderer: (item) => {
                const { link, name, likes, owner } = item;
                const isLiked = !!likes.find((item) => {
                    return item._id === _id;
                })
                const card = createCard(link, name, likes.length, _id === owner._id, item._id, isLiked);
                cardList.setItem(card);
            }
        }, '.cards');

        cardList.renderItems();
    })
        .catch((error) => console.log(`Ошибка: ${error}`))
})
    .catch((error) => console.log(`Ошибка: ${error}`))

