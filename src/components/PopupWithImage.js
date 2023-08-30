import Popup from "../components/Popup.js"
export default class PopupWithImage extends Popup {
    constructor({popupSelector, imagePopupZoomImage, captionPopupZoomImage, url, text}) {
        super({popupSelector})
        this.imagePopupZoomImage = imagePopupZoomImage;
        this.captionPopupZoomImage = captionPopupZoomImage; 
        this._url = url;
        this._text = text;
    }

    open() {                
        this.imagePopupZoomImage.src = this._url;
        this.imagePopupZoomImage.alt = this._text;
        this.captionPopupZoomImage.textContent = this._text;

        this._popup.classList.add("popup_status_active");        
        document.addEventListener("keydown", (evt) => this._handleEscClose(evt));       
    } 
    
}