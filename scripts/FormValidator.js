//const showInputError = (form, input, config) => {
//  input.classList.add(config.inputErrorClass);
//  const span = form.querySelector(`.${input.id}-error`);
//  span.textContent = input.validationMessage;
//  span.classList.add(config.errorClass);  
//};

//const hideInputError = (form, input, config) => {
//  input.classList.remove(config.inputErrorClass);
//  const span = form.querySelector(`.${input.id}-error`);
//  span.textContent = "";
//  span.classList.remove(config.errorClass);
//};

//const hasInvalidValue = (inputs) => {
//  return inputs.some((input) => {
//    return !input.validity.valid;
//  });
//};

//const isValid = (form, input, config) => {
//  if (!input.validity.valid) {
//    showInputError(form, input, config);
//  } else {
//    hideInputError(form, input, config);
//  }
//};

//const toggleButtonState = (inputs, button, config) => {
//  if (hasInvalidValue(inputs) === true) {
//    button.classList.add(config.inactiveButtonClass);
//    button.disabled = true;
//  } else {
//    button.classList.remove(config.inactiveButtonClass);
//    button.disabled = false;
//  }
//};

//const setEventListeners = (form, config) => {
  //const inputs = Array.from(form.querySelectorAll(config.inputSelector));
 // const button = form.querySelector(config.submitButtonSelector);
 // toggleButtonState(inputs, button, config);
 // inputs.forEach((input) => {
 //   input.addEventListener("input", () => {
 //     isValid(form, input, config);
 //     toggleButtonState(inputs, button, config);
 //   });
 // });
//};

//function enableValidation(config) {
//  const forms = Array.from(document.querySelectorAll(config.formSelector));
//  forms.forEach((form) => {
//    setEventListeners(form, config);
//  });
//}

//function clearingForm(popup, config) {    
//  const button = popup.querySelector(config.submitButtonSelector);
//  const inputs = Array.from(popup.querySelectorAll(config.inputSelector));
//  toggleButtonState(inputs, button, config);
//  inputs.forEach((input) => {
//    const form = popup.querySelector(config.formSelector);    
//    hideInputError(form, input, config);    
//  });
//}

class FormValidator {
  constructor (config) {
    this._forms = Array.from(document.querySelectorAll(config.formSelector));
    this._listSelectors = config;

  }

  enableValidation() {    
    this._forms.forEach((form) => {
      this._setEventListeners(form);
    });
  }

  _setEventListeners(form) {
    this._inputs = Array.from(form.querySelectorAll(this._listSelectors.inputSelector));
    this._button = form.querySelector(this._listSelectors.submitButtonSelector);
    
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(form, input);
        this._toggleButtonState(this._inputs, this._button);
      });
    });
  }

  _isValid(form, input) {
    if (!input.validity.valid) {
      this._showInputError(form, input);
    } else {
      this._hideInputError(form, input);
    }
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidValue(inputs) === true) {
      button.classList.add(this._listSelectors.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._listSelectors.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _hasInvalidValue(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _showInputError(form, input) {
    input.classList.add(this._listSelectors.inputErrorClass);
    const span = form.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
    span.classList.add(this._listSelectors.errorClass);  
  }
  
  _hideInputError(form, input) {
    input.classList.remove(this._listSelectors.inputErrorClass);
    const span = form.querySelector(`.${input.id}-error`);
    span.textContent = "";
    span.classList.remove(this._listSelectors.errorClass);
  }
}

class FormClearing extends FormValidator {
  constructor(popup, config) {
    super(config);
    this._popup = popup;
  }

  clearingForm() {    
    this._button = this._popup.querySelector(this._listSelectors.submitButtonSelector);
    this._inputs = Array.from(this._popup.querySelectorAll(this._listSelectors.inputSelector));
    this._toggleButtonState(this._inputs, this._button);
    this._inputs.forEach((input) => {
      const form = this._popup.querySelector(this._listSelectors.formSelector);    
      this._hideInputError(form, input);    
    });
  }
}

export {FormValidator, FormClearing}