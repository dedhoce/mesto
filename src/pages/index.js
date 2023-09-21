import '../page/index.css';
import { 
   buttonOpenPopupProfileEdit,   
   formPopupEditProfile,   
   buttonOpenPopupAddCard, 
   formPopupAddCard,
   captionPopupZoomImage,
   imagePopupZoomImage,
   buttonOpenPopupAvatarEdit,
   formPopupAvatarEdit,
   popupConfirmationDeleteCard,
   popupFormConfirmation
  } from '../utils/constants.js';

import { validationConfig } from '../utils/constants.js';

import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Popup from "../components/Popup.js"

import Api from '../components/Api.js';

const addDownloadSimbolPopup = (popup) => {
  popup.querySelector('.popup__button-save').textContent = 
    `${popup.querySelector('.popup__button-save').textContent}` + '...';
}

const removeDownloadSimbolPopup = (popup) => {
  popup.querySelector('.popup__button-save').textContent = 
    `${popup.querySelector('.popup__button-save').textContent}` - '...';
}

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

const popupConfirmation = new Popup({
  popupSelector: '.popup_confirmation'})

const section = new Section({ 
  renderer: (data) => {
    //console.log(data)            
    const url = data.url;
    const name = data.name;
    const idCard = data.idCard
    const card = new Card(data, 
      () => {                         
        popupWithImage.open(url, name)
        popupWithImage.setEventListener()                        
      },
      () => {        
        popupConfirmation.open();
        popupConfirmation.setEventListener();
        popupFormConfirmation.addEventListener('submit', (evt) => {
          evt.preventDefault();
          addDownloadSimbolPopup(popupConfirmation)
          api.deleteCard(idCard)
          .then((res) => {       
            if(res.ok) {
              removeDownloadSimbolPopup(popupConfirmation)
              return res.json();
            } else {
              console.log(`Ошибка ${res.status}`)
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })

          card.deleteCard()                             
          popupConfirmation.close()
        })        
      },
      userInfo.getUserId(),
      (trueContains, likeElement, likeIcon) => {               
        if (!trueContains) {          
          api.likeCard(idCard)
          .then(res => {       
            if(res.ok) {
              return res.json();
            } else {
              console.log(`Ошибка ${res.status}`)
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then(res => {            
            likeElement.textContent = res.likes.length;
            likeIcon.classList.add("element__group_status_active")
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })         
        } else {
          api.deleteLikeCard(idCard)
          .then(res => {       
            if(res.ok) {
              return res.json();
            } else {
              console.log(`Ошибка ${res.status}`)
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then(res => {
            likeElement.textContent = res.likes.length;
            likeIcon.classList.remove("element__group_status_active")
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
  submit: (data) => {
    addDownloadSimbolPopup(document.querySelector('.popup_edit_profile'))
    api.pushUserInfo(data)
      .then((res) => {       
        if(res.ok) {
          
          return res.json();
        } else {
          console.log(`Ошибка ${res.status}`)
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        const data = {}
        data.name = res.name;
        data.subname = res.about;
        data.avatar = res.avatar
        userInfo.setUserInfo(data)
        removeDownloadSimbolPopup(document.querySelector('.popup_edit_profile'))
        popupEditProfile.close()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });       
  }  
})

const popupAddCard = new PopupWithForm({
  popupSelector : '.popup_add_cards', 
  submit: (data) => {
    addDownloadSimbolPopup(document.querySelector('.popup_add_cards'))
    api.pushInfoCreateCard(data)
      .then((res) => {
        if(res.ok){
          removeDownloadSimbolPopup(document.querySelector('.popup_add_cards'))
          return res.json()
        } else {
          console.log(`Ошибка ${res.status}`)
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        //console.log(res)
        data.templateSelector = "#elements-item-template";
        data.name = res.name;
        data.url = res.link;
        data.idCard = res._id; 
        data.ownerId = res.owner._id              
        const object = false;
        //console.log(data)
        section.addItem(object, data)
        popupAddCard.close() 
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });   
             
}})

const popupAvatarEdit = new PopupWithForm({
  popupSelector : '.popup_avatar_edit', 
  submit: (data) => {
    addDownloadSimbolPopup(document.querySelector('.popup_avatar_edit'))       
    api.pushAvatar(data)
      .then((res) => {
        if(res.ok) {
          removeDownloadSimbolPopup(document.querySelector('.popup_avatar_edit'))
          userInfo.setAvatarImage(data)
          popupAvatarEdit.close()
        } else {
          console.log(`Ошибка ${res.status}`)
          console.log(res)
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });   
             
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

popupAddCard.setEventListener();
popupEditProfile.setEventListener();
popupAvatarEdit.setEventListener();

buttonOpenPopupProfileEdit.addEventListener("click", openPopupEditProfile);
buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);
buttonOpenPopupAvatarEdit.addEventListener('click', openPopupAvatarEdit);


enableValidation(formPopupEditProfile);
enableValidation(formPopupAddCard);
enableValidation(formPopupAvatarEdit);

//section.render()

api.getInitialCards()
  .then((initialCards) => {                
    const itemsForCard = {};
    itemsForCard.templateSelector = "#elements-item-template";
    initialCards.forEach((card) => {
        //console.log(card.likes)        
        
        itemsForCard.likesList = card.likes
        itemsForCard.idCard = card._id;           
        itemsForCard.ownerId = card.owner._id     
        itemsForCard.name = card.name;
        itemsForCard.url = card.link;
        itemsForCard.like = card.likes.length 
        //console.log(itemsForCard)                                               
        section.addItem(true, itemsForCard)           
    })  
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

api.getUserInfo()
  .then((info) => {    
    const data = {}
    data.name = info.name;
    data.subname = info.about;
    data.avatar = info.avatar
    data.idProfile = info._id
    userInfo.setUserInfo(data)
    userInfo.setAvatarImage(data)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });



