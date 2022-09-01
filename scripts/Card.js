export class Card {
    constructor(data, templateSelector, openImage) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openImage = openImage;
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
    generateCard() {
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
            this._openImage(this._name, this._link);
        });

        this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
    }

    //лайк карточки
    _likeCard(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    }
    //удаление карточки
    _deleteCard(evt) {
        this._element.remove();
    }
}
