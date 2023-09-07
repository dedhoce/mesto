import '../page/index.css';
import { 
   buttonOpenPopupProfileEdit,   
   formPopupEditProfile,   
   buttonOpenPopupAddCard, 
   formPopupAddCard,
   captionPopupZoomImage,
   imagePopupZoomImage
  } from '../utils/constants.js';

import { validationConfig } from '../utils/constants.js';
import {initialCards} from '../utils/cards.js';

import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';

const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_zoom_image", 
  imagePopupZoomImage, 
  captionPopupZoomImage   
})

const section = new Section({
  items: initialCards,
  renderer: (data) => {    
    const url = data.url;
    const text = data.text;
    const card = new Card(data, () => {                         
      popupWithImage.open(url, text)
      popupWithImage.setEventListener()                        
    })
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
    console.log(data.get('name'));    
    const dataUserInfo = {};
    dataUserInfo.name = data.get('name');
    dataUserInfo.aboutMyself = data.get('subname');  
    userInfo.setUserInfo(dataUserInfo);    
  }  
})

const popupAddCard = new PopupWithForm({
  popupSelector : '.popup_add_cards', 
  submit: (data) => {    
    const dataCards = {};
    dataCards.templateSelector = "#elements-item-template";
    dataCards.text = data.get('name');
    dataCards.url = data.get('url');
    const object = false;  
    section.addItem(object, dataCards)          
}})

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutMyselfSelector: ".profile__subname"
})

const openPopupEditProfile = () => {  
  formPopupEditProfile.reset();    
  popupEditProfile.setInputValues(userInfo.getUserInfo())
  popupEditProfile.open();  
}

const openPopupAddCard = () => { 
  formPopupAddCard.reset();    
  popupAddCard.open();  
}

popupAddCard.setEventListener();
popupEditProfile.setEventListener();

buttonOpenPopupProfileEdit.addEventListener("click", openPopupEditProfile);
buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);

enableValidation(formPopupEditProfile);
enableValidation(formPopupAddCard);

section.render()

