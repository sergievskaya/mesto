import { Popup } from "./Popup";

export class PopupWithForm extends Popup{
    constructor(popupSelector, callback) {
        super(popupSelector);
        this._callback = callback;
    }
}