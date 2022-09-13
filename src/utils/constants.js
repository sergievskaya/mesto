export const initialCards = [
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

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('#name-input');
export const jobInput = document.querySelector('#job-input');
export const formProfile = document.querySelector('#form-profile');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const formCard = document.querySelector('#form-card');
export const formsConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputInvalidClass: 'popup__input_invalid'
};
export const config = {
  cardTemplateSelector: '.card-template',
  cardContainerSelector: '.elements__list',
  popupProfileSelector: '.popup_type_profile',
  popupOpenImageSelector: '.popup_type_open-image',
  popupCardSelector: '.popup_type_card',
};