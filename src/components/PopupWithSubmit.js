import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        //this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
    }

    submitCallback(callback) {
        this._handleFormSubmit = callback;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });

        super.setEventListeners();
    }

}