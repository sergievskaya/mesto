import './index.css';
import { 
    initialCards, buttonEditProfile, buttonAddCard, nameInput,
    jobInput, formProfile, formCard, formsConfig, config
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js"; 
import { UserInfo } from "../components/UserInfo.js";

//создание новой карточки, экземпляра класса Card
function createCard(cardData) {
    const card = new Card({
        data: cardData,
        handleCardClick: (name, link) => {
            popupOpenImage.open(name, link);
        }
    }, config.cardTemplateSelector);
    const cardElement = card.generateCard();
    return cardElement;
}

//создание экземпляра класса Section
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    } 
}, config.cardContainerSelector);

cardsList.renderItems();

// создание экзкмпляра класса для попапа с картинкой
const popupOpenImage = new PopupWithImage(config.popupOpenImageSelector);
popupOpenImage.setEventListeners();

// создание экземпляра класса UserInfo
const userInfo = new UserInfo({
    userNameSelector: '.profile__title',
    userDescriptionSelector: '.profile__subtitle'
});

// создание экземпляра класса для попапа профиля
const popupProfile = new PopupWithForm(config.popupProfileSelector, (data) => {
    userInfo.setUserInfo(data);
    popupProfile.close();
});

popupProfile.setEventListeners();

// открытие попапа профиля
buttonEditProfile.addEventListener('click', function() {
    formProfileValidation.resetError();
    popupProfile.open();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.userName;
    jobInput.value = userData.userDescription;
});

// создание экземпляра класса для попапа добавления карточки
const popupCard = new PopupWithForm(config.popupCardSelector, (data) => {
    cardsList.addItem(createCard(data));
    popupCard.close();
});

popupCard.setEventListeners()

//открытие попапа добавления карточки
buttonAddCard.addEventListener('click', function() {
    formCardValidation.resetError();
    popupCard.open();
});

//Создание зкземпляров класса FormValidaator, включение валидаии
const formCardValidation = new FormValidator(formsConfig, formCard);
formCardValidation.enableValidation();

const formProfileValidation = new FormValidator(formsConfig, formProfile);
formProfileValidation.enableValidation();