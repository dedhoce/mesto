const buttonOpenPopupProfileEdit = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit_profile");
const buttonClosePopupList = document.querySelectorAll(".popup__button-close");
const profileName = document.querySelector(".profile__name");
const profileSubname = document.querySelector(".profile__subname");
const inputNameFormPopupProfile = popupEditProfile.querySelector(".popup__text_type_name");
const inputSubameFormPopupProfile = popupEditProfile.querySelector(".popup__text_type_subname");
const formPopupEditProfile = popupEditProfile.querySelector(".popup__form-edit-profile");
const popupAddCard = document.querySelector(".popup_add_cards");
const inputTitleFormPopupCard = document.querySelector(".popup__text_type_title");
const inputUrlFormPopupCard = document.querySelector(".popup__text_type_url");
//const cardImage = document.querySelector(".element__mask-group");
//const cardTitle = document.querySelector(".element__title");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const formPopupAddCard = document.querySelector(".popup__form-add-cards");
//const popupZoomImage = document.querySelector(".popup_zoom_image");
//const captionPopupZoomImage = document.querySelector(".popup__caption");
//const imagePopupZoomImage = document.querySelector(".popup__zoom-image");
const popupList = document.querySelectorAll(".popup");
const container = document.querySelector(".elements");
//const template = document.querySelector("#elements-item-template").content;


// включение валидации вызовом enableValidation
// все настройки передаются при вызове
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
import {FormValidator, FormClearing} from './FormValidator.js';
import {Card} from './Card.js';

const formValidator = new FormValidator(validationConfig)

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const openPopup = (popup) => {
  popup.classList.add("popup_status_active");
  document.addEventListener("keydown", closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_status_active");
  document.removeEventListener("keydown", closePopupByEsc);
};

const closeOpenedPopup = () => {
  const popupOpened = document.querySelector(".popup_status_active");
  closePopup(popupOpened);
};

const closePopupByEsc = (evt) => {
  if (evt.code === "Escape") {
    closeOpenedPopup();
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
  inputSubameFormPopupProfile.value = profileSubname.textContent;
};

const openPopupEditProfile = () => {
  formPopupEditProfile.reset();
  const FormClear = new FormClearing(popupEditProfile, validationConfig)
  FormClear.clearingForm(popupEditProfile);
  renameAuto();
  openPopup(popupEditProfile);
};

const openPopupAddCard = () => {
  formPopupAddCard.reset();
  const FormClear = new FormClearing(popupAddCard, validationConfig)
  FormClear.clearingForm(popupAddCard)
  //clearingForm(popupAddCard, validationConfig);
  openPopup(popupAddCard);
};

const handleFormPopupProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = `${inputNameFormPopupProfile.value}`;
  profileSubname.textContent = `${inputSubameFormPopupProfile.value}`;
  closeOpenedPopup();
};

//const handleLikeClick = (type) => {
//  type.querySelector(".element__group").classList.toggle("element__group_status_active");
//};

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
  //    imagePopupZoomImage.src = src;
  //    imagePopupZoomImage.alt = text;
  //    captionPopupZoomImage.textContent = text;
  //    openPopup(popupZoomImage);
  //  });
  //return element;
//};
//import { Card } from "./cards";
initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  const card = new Card(name, link, "#elements-item-template", openPopup)
  const cardElement = card.generateCard();
  container.append(cardElement);
});

const handleFormPopupCard = (evt) => {
  evt.preventDefault();
  const url = `${inputUrlFormPopupCard.value}`;
  const title = `${inputTitleFormPopupCard.value}`;
  const card = new Card(title, url, "#elements-item-template", openPopup)
  const cardElement = card.generateCard();  
  container.prepend(cardElement);
  formPopupAddCard.reset();
  const FormClear = new FormClearing(popupAddCard, validationConfig)
  FormClear.clearingForm(popupAddCard)
  //clearingForm(popupAddCard, validationConfig);
  closeOpenedPopup();
};

buttonOpenPopupProfileEdit.addEventListener("click", openPopupEditProfile);
buttonOpenPopupAddCard.addEventListener("click", openPopupAddCard);

buttonClosePopupList.forEach((btn) => {
  btn.addEventListener("click", closeOpenedPopup);
});

formPopupEditProfile.addEventListener("submit", handleFormPopupProfile);

formPopupAddCard.addEventListener("submit", handleFormPopupCard);

//enableValidation(validationConfig);

formValidator.enableValidation(validationConfig)
