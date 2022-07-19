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
  


function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

// три функия для закрытия любого попапа
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function closePopupClick(evt) {
    closePopup(evt.target.closest('.popup'));
}

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

const cardsList = document.querySelector('.elements__list');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

// создание карточки
function createCard(title, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.elements__item').cloneNode(true);

    card.querySelector('.elements__text').textContent = title;
    card.querySelector('.elements__image').setAttribute('src', link);

    card.querySelector('.elements__delete-button').addEventListener('click', function(evt){
      const card = evt.target.closest('.elements__item');
      card.remove();
    });
    
    card.querySelector('.elements__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like-button_active')
    });

    return card;
}

// добавление карточки
function addCard(title, link) {
    const card = createCard(title, link);

    cardsList.prepend(card);
}


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
 



/*function addCard(titlevalue, linkvalue) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    
    cardElement.querySelector('.elements__text').textContent = titlevalue;
    cardElement.querySelector('.elements__image').setAttribute('src', linkvalue)

    cardElement.querySelector('.elements__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like-button_active')
    })

    cardsList.append(cardElement);
}



/ отправка формы
formElementCard.addEventListener('submit', function(evt){
    evt.preventDefault();
    const title = titleInput.value;
    const link = linkInput.value;
  
    addCard(title, link);
   
    formElementCard.reset()
    closePopup(popupCard);
});






const likeButton = document.querySelectorAll('.elements__like-button')

 likeButton.forEach( function (item) {
     item.addEventListener('click', function(evt) {
         
         evt.target.classList.toggle('elements__like-button_active')
     })
})
*/


