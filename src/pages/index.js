import '../page/index.css';
import { buttonOpenPopupProfileEdit } from '../utils/constants.js';
import { inputNameFormPopupProfile } from '../utils/constants.js';
import { inputSubnameFormPopupProfile } from '../utils/constants.js';
import { formPopupEditProfile } from '../utils/constants.js';
import { inputTitleFormPopupCard } from '../utils/constants.js';
import { inputUrlFormPopupCard } from '../utils/constants.js';
import { buttonOpenPopupAddCard } from '../utils/constants.js';
import { formPopupAddCard } from '../utils/constants.js';

import { validationConfig } from '../utils/constants.js';
import {initialCards} from '../utils/cards.js';

import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const section = new Section({
  items: initialCards,
  renderer: () => {
    const itemsForCard = {}
    itemsForCard.url = inputUrlFormPopupCard.value;
    itemsForCard.text = inputTitleFormPopupCard.value;     
    return itemsForCard    
  },
  containerSelector: ".elements"
})

const enableValidation = (form) => {
  const formValidator = new FormValidator(form, validationConfig);
  formValidator.setEventListeners();  
}

const popupEditProfile = new PopupWithForm({
  popupSelector : '.popup_edit_profile', 
  submit: () => {                     
      userInfo.setUserInfo(inputNameFormPopupProfile, inputSubnameFormPopupProfile)                
}})

const popupAddCard = new PopupWithForm({
  popupSelector : '.popup_add_cards', 
  submit: () => {                  
    section.render()          
}})

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutMyselfSelector: ".profile__subname"
})

const openPopupEditProfile = () => {  
  formPopupEditProfile.reset();  
  userInfo.getUserInfo(inputNameFormPopupProfile, inputSubnameFormPopupProfile);
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

section.addItem()

