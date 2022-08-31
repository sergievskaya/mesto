const popupOpenImage = document.querySelector('.popup_type_open-image');
const imageInPopup = popupOpenImage.querySelector('.popup__image');
const textInPopup = popupOpenImage.querySelector('.popup__caption');

export class Card {
    constructor(data, templateSelector, openPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__item')
        .cloneNode(true);
        
        return cardElement;
    }
    //создание карточки
    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.elements__image');
        
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._element.querySelector('.elements__text').textContent = this._name;
        this._setEventListeners();

        return this._element;
    }

    //повесить слушатели
    _setEventListeners() {
        this._imageElement.addEventListener('click', () => {
            this._openImage();
        });

        this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
    }
    //открыть попап с картинкой
    _openImage(){
        imageInPopup.src = this._link;
        imageInPopup.alt = this._name;
        textInPopup.textContent = this._name;
            
        this._openPopup(popupOpenImage);
        }
    //лайк карточки
    _likeCard(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    }
    //удаление карточки
    _deleteCard(evt) {
        const card = evt.target.closest('.elements__item');
        card.remove();  
    }
}
