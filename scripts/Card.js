export class Card {
  
  constructor(text, url, templateSelector, openPopup) {
    this._templateSelector = templateSelector;
    this._text = text;
    this._url = url;
    this._openPopup = openPopup;     
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
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
      const popupZoomImage = document.querySelector(".popup_zoom_image");
      const captionPopupZoomImage = document.querySelector(".popup__caption");
      const imagePopupZoomImage = document.querySelector(".popup__zoom-image");

      imagePopupZoomImage.src = this._url;
      imagePopupZoomImage.alt = this._text;
      captionPopupZoomImage.textContent = this._text;
      this._openPopup(popupZoomImage);
    });
  }

  _handleLikeClick() {
    this._element.querySelector(".element__group").classList.toggle("element__group_status_active");
  }
}

//const createCard = (text, src) => {
  //const element = template.querySelector(".element").cloneNode(true);

  //element.querySelector(".element__title").textContent = text;
  //element.querySelector(".element__mask-group").alt = text;
  //element.querySelector(".element__mask-group").src = src;
  //element.querySelector(".element__group").addEventListener("click", () => {
  //  handleLikeClick(element);
  //});
  //element.querySelector(".element__trash").addEventListener("click", () => {
  //  element.remove();
  //});
  //element.querySelector(".element__mask-group").addEventListener("click", () => {
   //   imagePopupZoomImage.src = src;
   //   imagePopupZoomImage.alt = text;
   //   captionPopupZoomImage.textContent = text;
   //   openPopup(popupZoomImage);
  //  });
  //return element;
//};

//const popupZoomImage = document.querySelector(".popup_zoom_image");
//const captionPopupZoomImage = document.querySelector(".popup__caption");
//const imagePopupZoomImage = document.querySelector(".popup__zoom-image");

//const handleLikeClick = (type) => {
//  type.querySelector(".element__group").classList.toggle("element__group_status_active");
//};