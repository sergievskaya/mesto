const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelectorAll('.popup__close');
const titleElement = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const subtitleElement = document.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('#form-profile');
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_card');
const formElementCard = document.querySelector('#form-card');
const initialCards = [
    {
      name: 'Норвегия',
      link: 'https://images.unsplash.com/photo-1656802478225-2fc5f2db08fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Дубай',
      link: 'https://images.unsplash.com/photo-1656917051695-8a6d8df727f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
    },
    {
      name: 'Черепаха',
      link: 'https://images.unsplash.com/photo-1656004953298-9de99b01941c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=381&q=80'
    },
    {
      name: 'Шотландия',
      link: 'https://images.unsplash.com/photo-1658143290270-5e58c837d9d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Птица',
      link: 'https://images.unsplash.com/photo-1507513102283-2c608c88fd0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Альпы',
      link: 'https://images.unsplash.com/photo-1656925368663-f7e9cfb9c466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    }
  ];
const cardsList = document.querySelector('.elements__list');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup_type_open-image');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
};

// три функия для закрытия любого попапа
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
};

function closePopupClick(evt) {
    closePopup(evt.target.closest('.popup'));
};

closePopupButton.forEach(function(button) {
    button.addEventListener('click', closePopupClick);
});

// закрыть попап при клике мимо
popup.forEach(function(popupElement) {
    popupElement.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup')) {
         closePopup(popupElement);
        }
    })
});

// открытие попапа профиля
editButton.addEventListener('click', function() {
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
addButton.addEventListener('click', function() {
    openPopup(popupCard);
});



//удаление карточки
function deleteCard(evt) {
    const card = evt.target.closest('.elements__item');
    card.remove();  
};
//лайк карточки
function likeCard(evt) {
    evt.target.classList.toggle('elements__like-button_active');
};



function openImage(imageLink, title){
    popupOpenImage.querySelector('.popup__image').setAttribute('src', imageLink);
    popupOpenImage.querySelector('.popup__caption').textContent = title;

    openPopup(popupOpenImage);
}


function previewImage(evt){
    const image = evt.target;
    const cardContainer = image.closest('.elements__item');
    const imageLink = image.getAttribute('src');
    const title = cardContainer.querySelector('.elements__text').textContent;
    openImage(imageLink, title);
};


// создание карточки
function createCard(title, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.elements__item').cloneNode(true);

    card.querySelector('.elements__text').textContent = title;
    card.querySelector('.elements__image').setAttribute('src', link);

    card.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
    card.querySelector('.elements__like-button').addEventListener('click', likeCard);
    card.querySelector('.elements__image').addEventListener('click', previewImage);

    return card;
};

// добавление карточки
function addCard(title, link) {
    const card = createCard(title, link);

    cardsList.prepend(card);
};


// отправка формы
formElementCard.addEventListener('submit', function(evt){
    evt.preventDefault();
    const title = titleInput.value;
    const link = linkInput.value;
  
    addCard(title, link);
   
    formElementCard.reset()
    closePopup(popupCard);
});

// добавить карточки по умолч 
initialCards.forEach( function(element) {
    const title = element.name;
    const link = element.link;

    addCard(title, link);
});
 



