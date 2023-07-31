const showInputError = (form, input, config) => {
  input.classList.add(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = input.validationMessage;
  span.classList.add(config.errorClass);  
};

const hideInputError = (form, input, config) => {
  input.classList.remove(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = "";
  span.classList.remove(config.errorClass);
};

const hasInvalidValue = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const isValid = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
};

const toggleButtonState = (inputs, button, config) => {
  if (hasInvalidValue(inputs) === true) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
};

const setEventListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
};

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function clearFormWhenClosePopup(popup, config) {  
  let form = popup.querySelector(config.formSelector);  
  form.reset();  
  const button = popup.querySelector(config.submitButtonSelector);
  const inputs = Array.from(popup.querySelectorAll(config.inputSelector));
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {    
    hideInputError(form, input, config);    
  });
}

function formReset (config) {
  const popupOpened = document.querySelector('.popup_status_active');
  const form = popupOpened.querySelector(config.formSelector);
  if (popupOpened.contains(form)) {
    clearFormWhenClosePopup(popupOpened, config);
  }  
}