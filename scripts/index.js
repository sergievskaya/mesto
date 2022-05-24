const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

const titleElement = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const subtitleElement = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');


function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
};

editButton.addEventListener('click', function() {
    openPopup(popup)
    nameInput.value = titleElement.textContent
    jobInput.value = subtitleElement.textContent
});

closePopupButton.addEventListener('click', function() {
    closePopup(popup)
});

formElement.addEventListener('submit', function(event){
    event.preventDefault()
    titleElement.textContent = nameInput.value
    subtitleElement.textContent = jobInput.value
    closePopup(popup)
});
