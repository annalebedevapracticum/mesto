export const initialCards = [
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

export const mestoConfig = {
    inputSelector: '.popup__inputs',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__inputs_error',
    errorClass: 'popup__error'
};

export const formEdit = document.querySelector('.profile-form');
export const formAdd = document.querySelector('.add-form');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const cardsSection = document.querySelector('.cards');
