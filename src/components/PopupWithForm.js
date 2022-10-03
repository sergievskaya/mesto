import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputsList = this._popupForm.querySelectorAll('.popup__input');
        this._submitButton = this._popupElement.querySelector('.popup__submit-button');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._values = {};
        this._inputsList.forEach(input => {
            this._values[input.name] = input.value;
        });
        return this._values;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
        });

        super.setEventListeners();
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    loading(value) {
        if(value) {
            this._submitButton.textContent = 'Сохранение...'
        }else{
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}