const editForm = document.querySelector('.profile-form');
const addForm = document.querySelector('.add-form');
// Находим поля формы в DOM
const popupProfileInfo = document.querySelector('.popup-info');
const popupAddCard = document.querySelector('.popup__add-card');
const nameInput = document.querySelector('#popup__name');
const jobInput = document.querySelector('#popup__job');
const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const cardName = document.querySelector('#popup__card-name');
const cardLink = document.querySelector('#popup__card-link');
const profileDescription = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');
const templateElement = document.querySelector('.card-template').content;
const cardsSection = document.querySelector('.cards');
const imagePopup = document.querySelector('.popup__image');
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

function openAddForm(evt) {
    popupAddCard.classList.add('popup_opened');
}

function openEditForm(evt) {
    popupProfileInfo.classList.add('popup_opened');
}

function closeForm(popupElement) {
    popupElement.classList.remove('popup_opened');
}


closeButtons.forEach((button) => {
    const form = button.closest('.popup');
    button.addEventListener('click', () => {
        closeForm(form);
    })
})

editButton.addEventListener('click', openEditForm);
profileAddButton.addEventListener('click', openAddForm);


function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileDescription.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closeForm(popupProfileInfo);
}
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const listElement = templateElement.cloneNode(true);
    const cardImage = listElement.querySelector('.card__image');
    cardImage.src = cardLink.value;
    const cardTitle = listElement.querySelector('.card__title');
    cardTitle.textContent = cardName.value;
    cardLink.value = '';
    cardName.value = '';
    cardsSection.prepend(listElement);
    closeForm(popupAddCard);

}

editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

initialCards.forEach(function (card) {
    const listElement = templateElement.cloneNode(true);
    const cardImage = listElement.querySelector('.card__image');
    cardImage.src = card.link;
    const cardTitle = listElement.querySelector('.card__title');
    cardTitle.textContent = card.name;
    cardsSection.append(listElement);
});

cardsSection.addEventListener('click', function (event) {
    if (event.target.classList.contains('card__like')) {
        event.target.classList.toggle('card__like_active');
    }

    if (event.target.classList.contains('card__delete')) {
        let parentCard = event.target.closest('.card');
        parentCard.remove()
    }

    if (event.target.classList.contains('card__image')) {
        let parentCard = event.target.closest('.card');
        imagePopup.classList.add('popup_opened');
        const image = document.querySelector('.image__view');
        image.src = event.target.src;
        const text = document.querySelector('.image__text');
        text.textContent = parentCard.querySelector('.card__title').textContent;
    }

});

