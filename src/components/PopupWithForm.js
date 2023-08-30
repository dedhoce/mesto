import Popup from "../components/Popup.js"

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submit}) {
        super({popupSelector});
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form-input');                        
    }

    _getInputValues(evt) {        
        evt.preventDefault();            
        this._submit();
        this.close();        
    }

    setEventListener() {                
        this._form.addEventListener("submit", (evt) => this._getInputValues(evt))        
        this._buttonClosePopup.addEventListener("click", () => this.close());
        this._popup.addEventListener("click", (evt) => {
            if (evt.target === this._popup) {                
              this.close();
            }
          });
    }

    close() {                
        this._form.reset()
        this._popup.classList.remove("popup_status_active");
        document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));                
    }
}