export class Card {
  
  constructor(data, handleCardClick, handleTrashClick, idProfile, renderLikeCard) {        
    this._template = document
      .querySelector(data.templateSelector)
      .content;
    this._name = data.name;
    this._url = data.url;
    this._like = data.like
    this._ownerId = data.ownerId;    
    this._openPopupZoomImage = handleCardClick;
    this._openPopupConfirmation = handleTrashClick;
    this._idProfile = idProfile;    
    this.renderLikeCard = renderLikeCard;
    this._likesList = data.likesList    
  }

  _getTemplate() {
    if(this._idProfile === this._ownerId) {  
        const cardElement = this._template
        .querySelector('.element')
        .cloneNode(true);
        return cardElement
      } else {
        const cardElement = this._template
        .querySelector('.element')
        .cloneNode(true);
        cardElement.querySelector('.element__trash').remove();
        return cardElement
      }     
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();    
    if (this._like) {
      this._element.querySelector(".element__like-quantity").textContent = this._like
    } else {
      this._element.querySelector(".element__like-quantity").textContent = 0
    };
    if (this._likesList) {   
      this._likesList.forEach(profile => {         
        if (profile._id === this._idProfile) {
          this._element.querySelector(".element__group")
          .classList.add("element__group_status_active")       
        }      
      })
    }    
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__mask-group").alt = this._name;
    this._element.querySelector(".element__mask-group").src = this._url;

    return this._element
  }  

  _setEventListeners() {
    if (this._element.querySelector(".element__trash")) {
      this._element.querySelector(".element__trash").addEventListener("click", () => {
        this._openPopupConfirmation();        
      })
    }

    this._element.querySelector(".element__group").addEventListener("click", () => {
      this._handleLikeClick();
    })

    this._element.querySelector(".element__mask-group").addEventListener("click", () => {     
      this._openPopupZoomImage();
    })    
  }  

  _handleLikeClick() {
    this._like = this._element.querySelector(".element__like-quantity")
    this._likeIcon = this._element.querySelector(".element__group")    
    this.renderLikeCard(
      this._likeIcon.classList.contains('element__group_status_active'),
      this._like,
      this._likeIcon)
  
   
  }

  deleteCard() {    
    this._element.remove()
  }

}