import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputsList = this._popupForm.querySelectorAll('.popup__input');
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
            this._submitForm(this._getInputValues());
        });

        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}