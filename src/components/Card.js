export class Card {
  
  constructor(itemsForCard, handleCardClick
    ) {      
    this._template = document
      .querySelector(itemsForCard.templateSelector)
      .content;
    this._text = itemsForCard.text;
    this._url = itemsForCard.url;    
    this._openPopupZoomImage = handleCardClick;    
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

    this._element.querySelector(".element__mask-group").addEventListener("click", () => {     
      this._openPopupZoomImage();
    })    
  }  

  _handleLikeClick() {
    this._element.querySelector(".element__group").classList.toggle("element__group_status_active");
  }
}