let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let popupElement = document.querySelector('.popup');
let nameInput = document.querySelector('#popup__name');
let jobInput = document.querySelector('#popup__job');
let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openForm(evt) {
    popupElement.classList.add('popup_opened');
}

function closeForm(evt) {
    popupElement.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closeForm);

editButton.addEventListener('click', openForm);



function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profileDescription.textContent = jobInput.value;
    profileName.textContent =  nameInput.value;
    closeForm();
}

formElement.addEventListener('submit', formSubmitHandler);