const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formElementProfile = document.querySelector('#form-profile');
const popupCard = document.querySelector('.popup_type_card');
const addCardButton = document.querySelector('.profile__add-button');
const formElementCard = document.querySelector('#form-card');
const cardsList = document.querySelector('.elements__list');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup_type_open-image');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
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
    
    popupOpenImage.querySelector('.popup__image').setAttribute('src', image.src);
    popupOpenImage.querySelector('.popup__image').setAttribute('alt', image.alt);
    popupOpenImage.querySelector('.popup__caption').textContent = title.textContent;

    openPopup(popupOpenImage);
};

// создание карточки
function createCard(cardData) {
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.elements__image');
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    card.querySelector('.elements__text').textContent = cardData.name;

    card.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
    card.querySelector('.elements__like-button').addEventListener('click', likeCard);
    cardImage.addEventListener('click', openImage);

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

// открытие попапа профиля
editProfileButton.addEventListener('click', function() {
    openPopup(popupProfile);
    nameInput.value = titleElement.textContent;
    jobInput.value = subtitleElement.textContent;
});

// отправка формы профиля
formElementProfile.addEventListener('submit', function(evt){
    evt.preventDefault();
    titleElement.textContent = nameInput.value;
    subtitleElement.textContent = jobInput.value;
    closePopup(popupProfile);
});

//открытие попапа добавления карточки
addCardButton.addEventListener('click', function() {
    openPopup(popupCard);
});

// отправка формы с новой карточкой
formElementCard.addEventListener('submit', function(evt){
    evt.preventDefault();
    const cardData = {
        name: titleInput.value,
        link: linkInput.value
    };
    addCard(cardData);
    formElementCard.reset();
    closePopup(popupCard);
});