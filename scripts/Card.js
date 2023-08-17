export class Card {
  
  constructor(itemsForCard
    ) {      
    this._template = document
      .querySelector(itemsForCard.templateSelector)
      .content;
    this._text = itemsForCard.text;
    this._url = itemsForCard.url;
    this._openPopup = itemsForCard.openPopup;
    this._popupZoomImage = itemsForCard.popupZoomImage
    this.captionPopupZoomImage = itemsForCard.captionPopupZoomImage 
    this.imagePopupZoomImage = itemsForCard.imagePopupZoomImage      
  }

  _getTemplate() {
    const cardElement = this._template
      .querySelector('.element')
      .cloneNode(true);
    
      return cardElement
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._text;
    this._element.querySelector(".element__mask-group").alt = this._text;
    this._element.querySelector(".element__mask-group").src = this._url;

    return this._element
  }  

  _setEventListeners() {
    this._element.querySelector(".element__trash").addEventListener("click", () => {
      this._element.remove();
    })

    this._element.querySelector(".element__group").addEventListener("click", () => {
      this._handleLikeClick();
    })

    this._openPopupZoomImage()
  }

  _openPopupZoomImage() {
    this._element.querySelector(".element__mask-group").addEventListener("click", () => {
      this._renameItemsAndOpenPopupZoomImage()
    });
  }

  _renameItemsAndOpenPopupZoomImage() {
    this.imagePopupZoomImage.src = this._url;
    this.imagePopupZoomImage.alt = this._text;
    this.captionPopupZoomImage.textContent = this._text;
    this._openPopup(this._popupZoomImage);
  }

  _handleLikeClick() {
    this._element.querySelector(".element__group").classList.toggle("element__group_status_active");
  }
}