export class FormValidator {
  constructor (form, config) {
    this._form = form;
    this._listSelectors = config;
    this._inputs = Array.from(this._form.querySelectorAll(this._listSelectors.inputSelector));
    this._button = this._form.querySelector(this._listSelectors.submitButtonSelector);

  }  

  setEventListeners() {    
    this._toggleButtonState();
    this._form.addEventListener('reset', () => this._clearingForm())
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  _clearingForm() {
    this._enableSubmitButton();    
    this._inputs.forEach((input) => {          
      this._hideInputError(input);    
    });   
  }  

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidValue(this._inputs)) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }

  _enableSubmitButton() {
    this._button.classList.add(this._listSelectors.inactiveButtonClass);
    this._button.disabled = true;
  }


  _disableSubmitButton() {
    this._button.classList.remove(this._listSelectors.inactiveButtonClass);
    this._button.disabled = false;
  }

  _hasInvalidValue() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _showInputError(input) {
    input.classList.add(this._listSelectors.inputErrorClass);
    const span = this._form.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
    span.classList.add(this._listSelectors.errorClass);  
  }
  
  _hideInputError(input) {
    input.classList.remove(this._listSelectors.inputErrorClass);
    const span = this._form.querySelector(`.${input.id}-error`);
    span.textContent = "";
    span.classList.remove(this._listSelectors.errorClass);
  }
}