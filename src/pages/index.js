import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { mestoConfig, initialCards, buttonEdit, cardsSection, formAdd, formEdit, profileAddButton } from "../utils/constants.js";

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
    editProfileForm.resetValidation();
});
profileAddButton.addEventListener('click', function () {
    addCardPopupForm.open([]);
    addCardForm.resetValidation();
});

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const { src, name } = item;
        const card = createCard(src, name);
        cardList.setItem(card);
    }
}, '.cards');

cardList.renderItems();

