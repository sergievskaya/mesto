export class FormValidator {
  constructor(config, formElement){
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputInvalidClass = config.inputInvalidClass;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._inputInvalidClass);
    errorElement.textContent = this._inputElement.validationMessage;
  }
          
  _hideInputError()  {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputInvalidClass);
    errorElement.textContent = '';
  } 

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {  
      this._showInputError();
    } else {  
      this._hideInputError();
    }
  }
            
  _hasInvalidInput() {
    return this._inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }
            
  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  }
          
  _toggleButtonState()  {
    if (!this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', 'disabled');
    }
  }
        
  _setEventListeners() {
    this._toggleButtonState();
          
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
          
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableButton();
    });
          
    this._setEventListeners();
  }

}