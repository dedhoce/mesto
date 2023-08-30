export default class Popup {
    constructor({popupSelector}) {
        this._popup = document.querySelector(popupSelector);        
        this._buttonClosePopup = this._popup.querySelector(".popup__button-close");                
    }

    setEventListener() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target === this._popup) {
              this.close();
            }
          });
          console.log('PopupListener')
        this._buttonClosePopup.addEventListener("click", () => {                        
            this.close()            
        });
    }

    open() {               
        this._popup.classList.add("popup_status_active");        
        document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
        
    }

    close() {              
        this._popup.classList.remove("popup_status_active");
        document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
        this._buttonClosePopup.removeEventListener("click", () => {
            console.log(12)            
            this.close()            
        });            
    }

    _handleEscClose(evt) {
        if (evt.code === "Escape") {            
            this.close();
          }
    }
}
