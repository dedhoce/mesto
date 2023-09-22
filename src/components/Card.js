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
    this.renderLikeCard = renderLikeCard;
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
    const cardImage = this._element.querySelector(".element__mask-group");
    this._element = this._getTemplate();
    this._likelikesCountElement = this._element.querySelector(".element__like-quantity")
    this._likeIcon = this._element.querySelector(".element__group")
    this._setEventListeners();   
    this._likelikesCountElement.textContent = this._like;
    
    const isLiked = this._likesList.some(profile => {         
      return profile._id === this._idProfile      
    });

    if (isLiked) {
        this._element.querySelector(".element__group").classList.add("element__group_status_active");
    }    
        
    this._element.querySelector(".element__title").textContent = this._name;
    cardImage.alt = this._name;
    cardImage.src = this._url;

    return this._element
  }  

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".element__trash")
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
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
    this.renderLikeCard(
      this._likeIcon.classList.contains('element__group_status_active'),
      this._like,
      this._likeIcon)   
  }

  deleteCard() {    
    this._element.remove();
    this._element = null;
  }

  updateLikes(likeElement, cardLikes) {
    likeElement.textContent = cardLikes
  }

}