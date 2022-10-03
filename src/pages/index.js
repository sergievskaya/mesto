import './index.css';
import { 
    buttonEditProfile, buttonAddCard, nameInput,
    jobInput, formProfile, formCard, formsConfig, config, buttonEditAvatar, formAvatar,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js"; 
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";
import { Api } from "../components/Api";


// создание класса api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
    headers: {
      authorization: 'c178ff20-af0a-4e0f-9c0d-216464e441d9',
      'Content-Type': 'application/json'
    }
}); 

let userId;

// Загрузка карточек и данных о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatarInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

  // создание экземпляра класса UserInfo
const userInfo = new UserInfo({
    userNameSelector: '.profile__title',
    userDescriptionSelector: '.profile__subtitle',
    userAvatarSelector: '.profile__avatar-image'
});

//создание новой карточки, экземпляра класса Card
function createCard(cardData) {
    const card = new Card({
        data: cardData,
        userId: userId,
        handleCardClick: (name, link) => {
            popupOpenImage.open(name, link);
        },
        handleDeleteClick: (cardId) => {
            popupDeleteCard.open();
            popupDeleteCard.submitCallback(() => {
                api.deleteCard(cardId)
                  .then(() => {
                   card.deleteCard();
                   popupDeleteCard.close();
                  })
                  .catch((err) => {
                    console.log(err);
                })
            })
        },
        handleAddLikeClick: (cardId) => {
            api.addLikeCard(cardId)
              .then((data) => {
                card.likeCard(data);
              })
              .catch((err) => {
                console.log(err);
              });
        },
        handleDeleteLikeClick: (cardId) => {
            api.deleteLikeCard(cardId)
              .then((data) => {
                card.likeCard(data);
              })
              .catch((err) => {
                console.log(err);
              });
        }
    }, config.cardTemplateSelector);
    const cardElement = card.generateCard();
    return cardElement;
}

//создание экземпляра класса Section
const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    } 
}, config.cardContainerSelector);

// создание экземпляра класса для попапа редактирования профиля
const popupProfile = new PopupWithForm(config.popupProfileSelector, {
    handleFormSubmit: (data) => {
        popupProfile.loading(true);
        api.editProfile(data)
          .then((data) => {
            userInfo.setUserInfo(data);
            popupProfile.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupProfile.loading(false);
          })
    }
});
popupProfile.setEventListeners();

// открытие попапа редактирования профиля
buttonEditProfile.addEventListener('click', function() {
    formProfileValidation.resetError();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
    popupProfile.open();
});

// создание экземпляра класса для попапа редактирования аватара
const popupAvatar = new PopupWithForm( config.popupAvatarSelector, {
    handleFormSubmit: (data) => {
        popupAvatar.loading(true);
        api.editAvatar(data)
          .then((data) => {
            userInfo.setAvatarInfo(data);
            popupAvatar.close();
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            popupAvatar.loading(false);
          })
    }
});
popupAvatar.setEventListeners();

// открытие попапа редактирования аватара
buttonEditAvatar.addEventListener('click', function() {
    formAvatarValidation.resetError();
    popupAvatar.open();
});

// создание экземпляра класса для попапа добавления карточки
const popupCard = new PopupWithForm(config.popupCardSelector, {
    handleFormSubmit: (data) => {
        popupCard.loading(true);
        api.addNewCard(data)
          .then((data) => {
            cardsList.addItem(createCard(data));
            popupCard.close();
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => { 
            popupCard.loading(false);
          })
    }
});
popupCard.setEventListeners();

//открытие попапа добавления карточки
buttonAddCard.addEventListener('click', function() {
    formCardValidation.resetError();
    popupCard.open();
});

// создание экзкмпляра класса для попапа с картинкой
const popupOpenImage = new PopupWithImage(config.popupOpenImageSelector);
popupOpenImage.setEventListeners();


// попап удаления карточки 
const popupDeleteCard = new PopupWithSubmit(config.popupDeleteCardSelector);
popupDeleteCard.setEventListeners();

//Создание зкземпляров класса FormValidator, включение валидаии
const formCardValidation = new FormValidator(formsConfig, formCard);
formCardValidation.enableValidation();

const formProfileValidation = new FormValidator(formsConfig, formProfile);
formProfileValidation.enableValidation();

const formAvatarValidation = new FormValidator(formsConfig, formAvatar);
formAvatarValidation.enableValidation();