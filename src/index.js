import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { buttonEdit, cardsSection, formAdd, formEdit, profileAddButton } from "./helpers.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import "./pages/index.css";

const initialCards = [
    {
        name: 'Архыз',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const mestoConfig = {
    inputSelector: '.popup__inputs',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__inputs_error',
    errorClass: 'popup__error'
};

export const imagePopupForm = new PopupWithImage('.popup-image');
const addCardForm = new FormValidator(mestoConfig, formAdd);
const editProfileForm = new FormValidator(mestoConfig, formEdit);
addCardForm.enableValidation();
editProfileForm.enableValidation();

const profileInfo = new UserInfo({ nameSelector: ".profile__name", descriptionSelector: ".profile__description" });

function createCard(src, name) {
    const card = new Card({
        name,
        src
    }, '.card-template', (src, name) => imagePopupForm.open(src, name));

    return card.generateCard();
}

const handleEditSubmit = ([name, description]) => {
    profileInfo.setUserInfo(name, description);
}
const handleAddSubmit = ([name, src]) => {
    const card = createCard(src, name);
    addCardForm.toggleButtonState();
    cardsSection.prepend(card);
    formAdd.reset();
}

export const editPopupForm = new PopupWithForm('.popup-info', handleEditSubmit);
export const addCardPopupForm = new PopupWithForm('.popup-add-card', handleAddSubmit);

buttonEdit.addEventListener('click', function () {
    const { name, description } = profileInfo.getUserInfo();
    editPopupForm.open([name, description]);
});
profileAddButton.addEventListener('click', function () {
    addCardPopupForm.open([]);
});

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.card-template', (src, name) => imagePopupForm.open(src, name));
        const cardElement = card.generateCard();
        cardList.setItem(cardElement);
    }
}, '.cards');

cardList.renderItems();

