import '../page/index.css';
import { 
   buttonOpenPopupProfileEdit,   
   formPopupEditProfile,   
   buttonOpenPopupAddCard, 
   formPopupAddCard,
   captionPopupZoomImage,
   imagePopupZoomImage,
   buttonOpenPopupAvatarEdit,
   formPopupAvatarEdit   
  } from '../utils/constants.js';

import { validationConfig } from '../utils/constants.js';

import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from "../components/PopupConfirm.js"

import Api from '../components/Api.js';

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "6a605e63-1774-4c5f-989e-07adc5e69a71",
    "Content-Type": "application/json",
  },
});

const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_zoom_image", 
  imagePopupZoomImage, 
  captionPopupZoomImage   
})

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutMyselfSelector: ".profile__subname",
  avatarSelector: ".profile__avatar"
})

const popupConfirmation = new PopupConfirm({
  popupSelector: '.popup_confirmation'
})


const cardsSection = new Section({ 
  renderer: (data) => {
    //console.log(data)            
    const url = data.url;
    const name = data.name;
    const idCard = data.idCard
    const card = new Card(data, 
      () => {                         
        popupWithImage.open(url, name)                                
      },
      () => {         
        const handleDeleteCard = () => {
          popupConfirmation.setSubmitButtonText('Удаление...')
          api.deleteCard(idCard)
          .then((res) => {
            console.log(res)
            card.deleteCard();                            
            popupConfirmation.close();
          })          
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
          .finally(() => {            
            popupConfirmation.setSubmitButtonText('Да')
          })          
        }      
        popupConfirmation.setCallback(handleDeleteCard);
        popupConfirmation.open()               
      },
      userInfo.getUserId(),
      (trueContains) => {               
        if (!trueContains) {          
          api.likeCard(idCard)          
          .then(res => {
            card.updateLikes(trueContains, res.likes.length)           
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })         
        } else {
          api.deleteLikeCard(idCard)          
          .then(res => {
            card.updateLikes(trueContains, res.likes.length)            
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
        }
      }         
    )
    const cardElement = card.generateCard();
        
    return cardElement    
  },
  containerSelector: ".elements"
})

const enableValidation = (form) => {
  const formValidator = new FormValidator(form, validationConfig);
  formValidator.setEventListeners();  
}

const popupEditProfile = new PopupWithForm({
  popupSelector : '.popup_edit_profile', 
  handleSubmit: (data) => {
    popupEditProfile.setSubmitButtonText('Сохранение...')
    api.pushUserInfo(data)      
      .then((res) => {
        const data = {}
        data.name = res.name;
        data.subname = res.about;
        data.avatar = res.avatar
        userInfo.setUserInfo(data)        
        popupEditProfile.close()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => popupEditProfile.setSubmitButtonText('Сохранить'))       
  }  
})

const popupAddCard = new PopupWithForm({
  popupSelector : '.popup_add_cards', 
  handleSubmit: (data) => {
    popupAddCard.setSubmitButtonText('Создание...')
    api.pushInfoCreateCard(data)      
      .then((res) => {       
        data.templateSelector = "#elements-item-template";
        data.name = res.name;
        data.url = res.link;
        data.idCard = res._id; 
        data.ownerId = res.owner._id      
        cardsSection.prependItem(data)
        popupAddCard.close() 
      })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => popupAddCard.setSubmitButtonText('Создать'))            
}})

const popupAvatarEdit = new PopupWithForm({
  popupSelector : '.popup_avatar_edit', 
  handleSubmit: (data) => {
    popupAvatarEdit.setSubmitButtonText('Сохранение...')       
    api.pushAvatar(data)
      .then((res) => {
        console.log(res)
        userInfo.setAvatarImage(data);
        popupAvatarEdit.close();
      })      
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => {
        
        popupAvatarEdit.setSubmitButtonText('Сохранить')
      })             
}})



const openPopupEditProfile = () => {  
  formPopupEditProfile.reset();    
  popupEditProfile.setInputValues(userInfo.getUserInfo())
  popupEditProfile.open();  
}

const openPopupAddCard = () => { 
  formPopupAddCard.reset();    
  popupAddCard.open();  
}

const openPopupAvatarEdit = () => {
  formPopupAvatarEdit.reset();  
  popupAvatarEdit.setInputValues(userInfo.getUserInfo());
  popupAvatarEdit.open();
}

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupAvatarEdit.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmation.setEventListeners();

buttonOpenPopupProfileEdit.addEventListener("click", openPopupEditProfile);
buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);
buttonOpenPopupAvatarEdit.addEventListener('click', openPopupAvatarEdit);


enableValidation(formPopupEditProfile);
enableValidation(formPopupAddCard);
enableValidation(formPopupAvatarEdit);


Promise.all([
  api.getInitialCards(),
  api.getUserInfo()    
])
  .then(([cards, user]) => {        
     return {
      initialCards: cards,
      userInformation: user
    }
  })
  .then(({initialCards, userInformation}) => {
      const data = {}
      data.name = userInformation.name;
      data.subname = userInformation.about;
      data.avatar = userInformation.avatar
      data.idProfile = userInformation._id        
      userInfo.setUserInfo(data)
      userInfo.setAvatarImage(data)    
      const itemsForCard = {};
      itemsForCard.templateSelector = "#elements-item-template";
      initialCards.forEach((card) => {         
          itemsForCard.likesList = card.likes
          itemsForCard.idCard = card._id;           
          itemsForCard.ownerId = card.owner._id     
          itemsForCard.name = card.name;
          itemsForCard.url = card.link;
          itemsForCard.likesCount = card.likes.length;                                                         
          cardsSection.appendItem(itemsForCard)
      })                  
  })
  .catch((err) => {
    console.log(err); 
  }) 
