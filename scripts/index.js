
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const nameInput = popupProfile.querySelector('#name-input');
const jobInput = popupProfile.querySelector('#job-input');
const formProfile = popupProfile.querySelector('#form-profile');
const popupCard = document.querySelector('.popup_type_card');
const buttonAddCard = document.querySelector('.profile__add-button');
const formCard = popupCard.querySelector('#form-card');
const titleInput = popupCard.querySelector('#title-input');
const linkInput = popupCard.querySelector('#link-input');
const cardsList = document.querySelector('.elements__list');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const formsConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputInvalidClass: 'popup__input_invalid'
};

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

// закрыть попап при клике
popups.forEach(function(popupElement) {
    popupElement.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(popupElement);
        }
    });
});

//закрыть попап при нажатии esc
function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
       const popup = document.querySelector('.popup_opened');
       closePopup(popup);
    };
};

//добавление карточки
function addCard(cardData) {
    const card = new Card(cardData, '.card-template', openPopup);
    const cardElement = card.createCard();
  
    cardsList.prepend(cardElement);
};

// добавить карточки по умолч 
initialCards.forEach( function(cardData) {
    addCard(cardData);
});

// открытие попапа профиля
buttonEditProfile.addEventListener('click', function() {
    openPopup(popupProfile);
    nameInput.value = titleElement.textContent;
    jobInput.value = subtitleElement.textContent;
});

// отправка формы профиля
formProfile.addEventListener('submit', function(evt){
    titleElement.textContent = nameInput.value;
    subtitleElement.textContent = jobInput.value;
    closePopup(popupProfile);
});

//открытие попапа добавления карточки
buttonAddCard.addEventListener('click', function() {
    openPopup(popupCard);
});

/// отправка формы с новой карточкой
formCard.addEventListener('submit', function(evt){
    const cardData = {
        name: titleInput.value,
        link: linkInput.value
    };
    addCard(cardData);
    formCard.reset();
    closePopup(popupCard);
});

formList.forEach(function(formElement) {
    const formValidation = new FormValidator(formsConfig, formElement);
    formValidation.enableValidation();
});