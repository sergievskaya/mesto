import { Popup } from "./Popup";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._imageInPopup = this._popupElement.querySelector('.popup__image');
        this._textInPopup = this._popupElement.querySelector('.popup__caption');
    }
    
    open(name, link) {
        this._imageInPopup.src = link;
        this._imageInPopup.alt = name;
        this._textInPopup.textContent = name;

        super.open();
    }
}