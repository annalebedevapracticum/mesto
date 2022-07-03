export const imagePopupForm = document.querySelector('.popup-image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__text');
export const formEdit = document.querySelector('.profile-form');
export const formAdd = document.querySelector('.add-form');
// Находим поля формы в DOM
export const popupProfileInfo = document.querySelector('.popup-info');
export const popupAddCard = document.querySelector('.popup-add-card');
export const nameInput = document.querySelector('#popup__name');
export const jobInput = document.querySelector('#popup__job');
export const buttonsClose = document.querySelectorAll('.popup__close');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const cardName = document.querySelector('#popup__card-name');
export const cardLink = document.querySelector('#popup__card-link');
export const profileDescription = document.querySelector('.profile__description');
export const profileAddButton = document.querySelector('.profile__add-button');
export const cardsSection = document.querySelector('.cards');

export function openForm(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
    popupElement.addEventListener('click', handleOverlayClick)
}

export function handleOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        closeForm(event.target);
    }
}

export function closeForm(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
    popupElement.removeEventListener('click', handleOverlayClick);
}

export function closeOpenedForm() {
    const openedForm = document.querySelector('.popup_opened');
    closeForm(openedForm);
}

export function handleEscape(event) {
    if (event.key === 'Escape') {
        closeOpenedForm();
    }
}