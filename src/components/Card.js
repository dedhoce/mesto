export class Card {
  
  constructor(data, handleCardClick, handleTrashClick, idProfile, renderLikeCard) {                
    this._template = document
      .querySelector(data.templateSelector)
      .content;
    this._name = data.name;
    this._url = data.url;
    this._likesCount = data.likesCount
    this._ownerId = data.ownerId;    
    this._openPopupZoomImage = handleCardClick;
    this._openPopupConfirmation = handleTrashClick;
    this._idProfile = idProfile;    
    this._renderLikeCard = renderLikeCard;
    this._likesList = data.likesList       
  }

  _getTemplate() {
    const cardElement = this._template
        .querySelector('.element')
        .cloneNode(true);   
    
    if(this._idProfile !== this._ownerId) {  
      cardElement.querySelector('.element__trash').remove();        
    }

    return cardElement;     
  }

  generateCard() {    
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__mask-group");
    this._likesCountElement = this._element.querySelector(".element__like-quantity")
    this._likeIcon = this._element.querySelector(".element__group")
    this._setEventListeners();
    if (this._likesList)  {
      this._likesCountElement.textContent = this._likesCount;    
      const isLiked = this._likesList.some(profile => {                 
        return profile._id === this._idProfile      
      });      
      if (isLiked) {
        this._likeIcon.classList.add("element__group_status_active");
      }
    };       
    this._element.querySelector(".element__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._url;

    return this._element
  }  

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".element__trash")
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        this._openPopupConfirmation();        
      })
    }

    this._likeIcon.addEventListener("click", () => {
      this._handleLikeClick();
    })

    this._cardImage.addEventListener("click", () => {     
      this._openPopupZoomImage();
    })    
  }  

  _handleLikeClick() {        
    this._renderLikeCard(
      this._likeIcon.classList.contains('element__group_status_active'),      
    )   
  }

  deleteCard() {    
    this._element.remove();
    this._element = null;
  }

  updateLikes(trueContains, cardLikes) {    
    this._likesCountElement.textContent = cardLikes
    if(!trueContains) {
      this._likeIcon.classList.add("element__group_status_active")
    } else {
      this._likeIcon.classList.remove("element__group_status_active")
    }
    
  }

}