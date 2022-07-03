import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { buttonEdit, buttonsClose, cardLink, cardName, cardsSection, closeForm, formAdd, formEdit, jobInput, nameInput, openForm, popupAddCard, popupProfileInfo, profileAddButton, profileDescription, profileName } from "./helpers.js";

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
    addCardForm.toggleButtonState();
    cardsSection.prepend(card);
    closeForm(popupAddCard);
    formAdd.reset();
}

formEdit.addEventListener('submit', editFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);

initialCards.forEach(function (card) {
    const listElement = createCard(card.link, card.name);
    cardsSection.append(listElement);
});