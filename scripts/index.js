import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const formEdit = document.querySelector('.profile-form');
const formAdd = document.querySelector('.add-form');
// Находим поля формы в DOM
const popupProfileInfo = document.querySelector('.popup-info');
const popupAddCard = document.querySelector('.popup-add-card');
const nameInput = document.querySelector('#popup__name');
const jobInput = document.querySelector('#popup__job');
const buttonsClose = document.querySelectorAll('.popup__close');
const buttonEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const cardName = document.querySelector('#popup__card-name');
const cardLink = document.querySelector('#popup__card-link');
const profileDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');
const cardsSection = document.querySelector('.cards');
export const imagePopupForm = document.querySelector('.popup-image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__text');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const mestoConfig = {
    inputSelector: '.popup__inputs',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__inputs_error',
    errorClass: 'popup__error'
};

const addCardForm = new FormValidator(mestoConfig, formAdd);
const editProfileForm = new FormValidator(mestoConfig, formEdit);
addCardForm.enableValidation();
editProfileForm.enableValidation();

export function openForm(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
    popupElement.addEventListener('click', handleOverlayClick)
}

function handleOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        closeForm(event.target);
    }
}

function closeForm(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
    popupElement.removeEventListener('click', handleOverlayClick);
}

function closeOpenedForm() {
    const openedForm = document.querySelector('.popup_opened');
    closeForm(openedForm);
}

function handleEscape(event) {
    if (event.key === 'Escape') {
        closeOpenedForm();
    }
}

function createCard(src, name) {
    const card = new Card({
        name,
        src
    }, '.card-template');

    return card.generateCard();
}


buttonsClose.forEach((button) => {
    const form = button.closest('.popup');
    button.addEventListener('click', () => {
        closeForm(form);
    })
})

buttonEdit.addEventListener('click', function () {
    openForm(popupProfileInfo);
    jobInput.value = profileDescription.textContent;
    nameInput.value = profileName.textContent;
});
profileAddButton.addEventListener('click', function () {
    openForm(popupAddCard);
});


function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileDescription.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closeForm(popupProfileInfo);
}
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const card = createCard(cardLink.value, cardName.value);
    formAdd.reset();
    addCardForm.toggleButtonState();
    cardsSection.prepend(card);
    closeForm(popupAddCard);
}

formEdit.addEventListener('submit', editFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);

initialCards.forEach(function (card) {
    const listElement = createCard(card.link, card.name);
    cardsSection.append(listElement);
});