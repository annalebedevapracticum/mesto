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
const templateElement = document.querySelector('.card-template').content;
const cardsSection = document.querySelector('.cards');
const imagePopup = document.querySelector('.popup-image');

function openForm(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closeForm(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function createCard(src, name) {
    const listElement = templateElement.cloneNode(true);
    const cardImage = listElement.querySelector('.card__image');
    cardImage.src = src;
    cardImage.alt = name;
    const cardTitle = listElement.querySelector('.card__title');
    cardTitle.textContent = name;
    cardImage.addEventListener('click', function (evt) {
        openForm(imagePopup);
        const image = document.querySelector('.popup__image');
        image.src = src;
        const text = document.querySelector('.popup__text');
        text.textContent = name;
    });

    const buttonDelete = listElement.querySelector('.card__delete');
    buttonDelete.addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    
    const buttonLike = listElement.querySelector('.card__like');
    buttonLike.addEventListener('click', function () {
        buttonLike.classList.toggle('card__like_active');
    });

    return listElement;
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
    cardLink.value = '';
    cardName.value = '';
    cardsSection.prepend(card);
    closeForm(popupAddCard);

}

formEdit.addEventListener('submit', editFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);

initialCards.forEach(function (card) {
    const listElement = createCard(card.link, card.name);
    cardsSection.append(listElement);
});

