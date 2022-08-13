const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputInvalidClass);
  errorElement.textContent = errorMessage;
};
  
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputInvalidClass);
  errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
  
function hasInvalidInput(inputList) {
  return inputList.every(function(inputElement) {
  return inputElement.validity.valid;
  });
};
  
function disableButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (!hasInvalidInput(inputList)) {
  disableButton(buttonElement, config);
  } else {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'disabled');
  }
}; 

function setEventListeners(formElement, buttonElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(function(formElement) {
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      disableButton(buttonElement, config);
    });

    setEventListeners(formElement, buttonElement, config);
  });
};