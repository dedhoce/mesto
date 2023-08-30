export const captionPopupZoomImage = document.querySelector(".popup__caption");
export const imagePopupZoomImage = document.querySelector(".popup__zoom-image");
export const buttonOpenPopupProfileEdit = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit_profile");
export const inputNameFormPopupProfile = popupEditProfile.querySelector(".popup__text_type_name");
export const inputSubnameFormPopupProfile = popupEditProfile.querySelector(".popup__text_type_subname");
export const formPopupEditProfile = popupEditProfile.querySelector(".popup__form-edit-profile");
export const inputTitleFormPopupCard = document.querySelector(".popup__text_type_title");
export const inputUrlFormPopupCard = document.querySelector(".popup__text_type_url");
export const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
export const formPopupAddCard = document.querySelector(".popup__form-add-cards");

export const validationConfig = {
    popupSelector: ".popup",
    popupActiveSelector: "popup_status_active",
    formSelector: ".popup__form-input",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_inactive",
    inputErrorClass: "popup__text_type_error",
    errorClass: "popup__text-error_active",
  };