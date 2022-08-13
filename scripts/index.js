const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const formProfile = document.querySelector('#form-profile');
const popupCard = document.querySelector('.popup_type_card');
const buttonAddCard = document.querySelector('.profile__add-button');
const formCard = document.querySelector('#form-card');
const cardsList = document.querySelector('.elements__list');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const popupOpenImage = document.querySelector('.popup_type_open-image');
const imageInPopup = popupOpenImage.querySelector('.popup__image');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
const formsConfig = {
    formSelector: '.popup__form',
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

//удаление карточки
function deleteCard(evt) {
    const card = evt.target.closest('.elements__item');
    card.remove();  
};
//лайк карточки
function likeCard(evt) {
    evt.target.classList.toggle('elements__like-button_active');
};

// открытие попапа с картинкой
function openImage(evt){
    const image = evt.target;
    const cardContainer = image.closest('.elements__item');
    const title = cardContainer.querySelector('.elements__text');
    imageInPopup.setAttribute('src', image.src);
    imageInPopup.setAttribute('alt', image.alt);
    popupOpenImage.querySelector('.popup__caption').textContent = title.textContent;

    openPopup(popupOpenImage);
};

function clickCard(evt) {
    if (evt.target.classList.contains('elements__delete-button')) {
    deleteCard(evt);
    } else if (evt.target.classList.contains('elements__like-button')) {
        likeCard(evt);
    } else if (evt.target.classList.contains('elements__image')){
        openImage(evt);
    }
};

// создание карточки
function createCard(cardData) {
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.elements__image');
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    card.querySelector('.elements__text').textContent = cardData.name;

    card.addEventListener('click', clickCard);
    
    return card;
};

// добавление карточки
function addCard(cardData) {
    const card = createCard(cardData);

    cardsList.prepend(card);
};

// добавить карточки по умолч 
initialCards.forEach( function(cardData) {
    addCard(cardData);
});

// закрыть попап при клике
popups.forEach(function(popupElement) {
    popupElement.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(popupElement);
        }
    });
});

function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
       const popup = document.querySelector('.popup_opened');
       closePopup(popup);
    };
};

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

// отправка формы с новой карточкой
formCard.addEventListener('submit', function(evt){
    const cardData = {
        name: titleInput.value,
        link: linkInput.value
    };
    addCard(cardData);
    formCard.reset();
    closePopup(popupCard);
});

enableValidation(formsConfig);