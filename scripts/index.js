const buttonOpenPopupProfileEdit = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit_profile");
const buttonClosePopupList = document.querySelectorAll(".popup__button-close");
const profileName = document.querySelector(".profile__name");
const profileSubname = document.querySelector(".profile__subname");
const inputNameFormPopupProfile = popupEditProfile.querySelector(".popup__text_type_name");
const inputSubnameFormPopupProfile = popupEditProfile.querySelector(".popup__text_type_subname");
const formPopupEditProfile = popupEditProfile.querySelector(".popup__form-edit-profile");
const popupAddCard = document.querySelector(".popup_add_cards");
const inputTitleFormPopupCard = document.querySelector(".popup__text_type_title");
const inputUrlFormPopupCard = document.querySelector(".popup__text_type_url");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const formPopupAddCard = document.querySelector(".popup__form-add-cards");
const popupZoomImage = document.querySelector(".popup_zoom_image");
const captionPopupZoomImage = document.querySelector(".popup__caption");
const imagePopupZoomImage = document.querySelector(".popup__zoom-image");
const popupList = document.querySelectorAll(".popup");
const container = document.querySelector(".elements");

const validationConfig = {
  popupSelector: ".popup",
  popupActiveSelector: "popup_status_active",
  formSelector: ".popup__form-input",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__text-error_active",
};

import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {initialCards} from './cards.js'

const enableValidation = (form) => {
  const formValidator = new FormValidator(form, validationConfig);
  formValidator.setEventListeners();  
}

const openPopup = (popup) => {  
  popup.classList.add("popup_status_active");
  document.addEventListener("keydown", closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_status_active");
  document.removeEventListener("keydown", closePopupByEsc);
};

const closePopupByEsc = (evt) => {  
  if (evt.code === "Escape") {
    const popupOpened = document.querySelector(".popup_status_active");
    closePopup(popupOpened);
  }
};

popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

const renameAuto = () => {
  inputNameFormPopupProfile.value = profileName.textContent;
  inputSubnameFormPopupProfile.value = profileSubname.textContent;
};

const openPopupEditProfile = () => {
  formPopupEditProfile.reset();  
  renameAuto();
  openPopup(popupEditProfile);
};

const openPopupAddCard = () => {
  formPopupAddCard.reset();    
  openPopup(popupAddCard);
};

const itemsForCard = {      
  openPopup, 
  popupZoomImage, 
  captionPopupZoomImage, 
  imagePopupZoomImage
}

const createCard = (itemsForCard) => {
  itemsForCard.templateSelector = "#elements-item-template";
  const card = new Card(itemsForCard);  
  const cardElement = card.generateCard();
  return cardElement
}

initialCards.forEach((item) => {
  itemsForCard.text = item.name;
  itemsForCard.url = item.link;  
  
  container.append(createCard(itemsForCard));
});

const handleFormPopupProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputNameFormPopupProfile.value;
  profileSubname.textContent = inputSubnameFormPopupProfile.value;
  closePopup(popupEditProfile);
};

const handleFormPopupCard = (evt) => {
  evt.preventDefault();
  itemsForCard.url = inputUrlFormPopupCard.value;
  itemsForCard.text = inputTitleFormPopupCard.value;  
  
  container.prepend(createCard(itemsForCard));

  //formPopupAddCard.reset();

  closePopup(popupAddCard);
};

buttonOpenPopupProfileEdit.addEventListener("click", openPopupEditProfile);
buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);

buttonClosePopupList.forEach((btn) => {
  btn.addEventListener("click", () => closePopup(btn.parentNode.parentNode));
});

formPopupEditProfile.addEventListener("submit", handleFormPopupProfile);

formPopupAddCard.addEventListener("submit", handleFormPopupCard);

enableValidation(formPopupEditProfile);
enableValidation(formPopupAddCard);