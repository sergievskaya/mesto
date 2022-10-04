export class Card {
    constructor({ data, userId,  handleCardClick, handleDeleteClick, handleAddLikeClick, handleDeleteLikeClick},  templateSelector) {
        this._cardData = data;
        this._userId = userId;
        this._cardOwnerId = data.owner._id;
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._likesNumber = data.likes.length;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleAddLikeClick = handleAddLikeClick;
        this._handleDeleteLikeClick = handleDeleteLikeClick;
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
        this._cardElement = this._getTemplate();
        this._imageElement = this._cardElement.querySelector('.elements__image');
        this._deleteButton = this._cardElement.querySelector('.elements__delete-button');
        this._likeButton = this._cardElement.querySelector('.elements__like-button');
        this._likeElement = this._cardElement.querySelector('.elements__likes-number');

        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._cardElement.querySelector('.elements__text').textContent = this._name;
        this._likeElement.textContent = this._likesNumber;

        this._removeDeleteButton();
        this._checkLikedCard();
        this._setEventListeners();

        return this._cardElement;
    }

    //если у карточки другой владелец, убирается кнопка delete
    _removeDeleteButton() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteButton.remove();
        }
    }

    //проверить стоит ли лайк на карточке
    _checkLikedCard() {
        if (this._cardData.likes.some((user) => user._id === this._userId)) {
            this._likeButton.classList.add('elements__like-button_active');
        }
        }

    //повесить слушатели
    _setEventListeners() {
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('elements__like-button_active')) {
                this._handleDeleteLikeClick(this._cardId);
            }else {
                this._handleAddLikeClick(this._cardId);
            }
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick(this._cardId);
        });
    }

    //лайк карточки
    likeCard(data) {
        this._likeButton.classList.toggle('elements__like-button_active');
        this._likeElement.textContent = data.likes.length;
    }
    //удаление карточки
    deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }
}