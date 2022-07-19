
const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const closePopupButton = document.querySelectorAll('.popup__close');
const popupCard = document.querySelector('.popup_type_card');

const editButton = document.querySelector('.profile__edit-button');
const titleElement = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const subtitleElement = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
};

function closePopupClick(evt){
    closePopup(evt.target.closest('.popup'))
};

closePopupButton.forEach(button => {
    button.addEventListener('click', closePopupClick)
});

popup.forEach(popupElement => {
    popupElement.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popupElement);
      }
    });
  })

editButton.addEventListener('click', function() {
    openPopup(popupProfile)
    nameInput.value = titleElement.textContent
    jobInput.value = subtitleElement.textContent
});


formElement.addEventListener('submit', function(evt){
    evt.preventDefault()
    titleElement.textContent = nameInput.value
    subtitleElement.textContent = jobInput.value
    closePopup(popupProfile)
});

addButton.addEventListener('click', function() {
    openPopup(popupCard)
    
});


/*
const likeButton = document.querySelectorAll('.elements__like-button')

 likeButton.forEach( function (item) {
     item.addEventListener('click', function() {
         let clickedLike = item;
         clickedLike.classList.add('elements__like-button_active')
     })
})
*/
/* пример дабавления карточки
const container = document.querySelector('.elements__list')

function addSong(namevalue, jobvalue){
    container.insertAdjacentHTML("beforeend", `
    <li class="elements__item">
    <button class="elements__delete-button" type="button"></button>
    <img src="./images/elements-image-karachayevsk.jpg" alt="${jobvalue}" class="elements__image">
    <div class="elements__container">
    <h2 class="elements__text">${namevalue}</h2>
        <button class="elements__like-button" type="button"></button>
    </div>
</li>
    `)
    closePopup(popupProfile);
}

formElement.addEventListener('submit', function(evt){
    evt.preventDefault();
    const name = document.querySelector('.popup__input_type_name');
    const job = document.querySelector('.popup__input_type_job');
  
    addSong(name.value, job.value);
   
  
    name.value = '';
    job.value = '';
    closePopup(popupProfile);
});
*/