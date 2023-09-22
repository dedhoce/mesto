import Popup from "./Popup.js";
export  default class PopupConfirm extends Popup {
    constructor({popupSelector}) {
        super({popupSelector});
        this._form = this._popup.querySelector(".popup__form-confirmation");
        this._submitButton = this._form.querySelector(".popup__button-save");
    }

    setCallback(submitCb) {
       this._handleSubmit = submitCb;
    }
    
    setEventListeners() {
       super.setEventListeners();
       this._form.addEventListener('submit', (evt) => {
          evt.preventDefault()
          this._handleSubmit();
       })
    }

    setSubmitButtonText(text) {
        this._submitButton.textContent = text;
    }

 }