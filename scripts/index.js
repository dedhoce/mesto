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
const cardImage = document.querySelector(".element__mask-group");
const cardTitle = document.querySelector(".element__title");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const formPopupAddCard = document.querySelector(".popup__form-add-cards");
const popupZoomImage = document.querySelector('.popup_zoom_image');
const captionPopupZoomImage = document.querySelector('.popup__caption');
const imagePopupZoomImage = document.querySelector('.popup__zoom-image');
const popupList = document.querySelectorAll('.popup');
const container = document.querySelector(".elements");
const template = document.querySelector("#elements-item-template").content;

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: '.popup__form-input',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
}

function openPopup (popup) {
  popup.classList.add("popup_status_active");
  closePopupAlternative();
};

function closePopup (popup) {
  popup.classList.remove("popup_status_active");
  popup.querySelectorAll('.popup__text').forEach((input) => {
    input.value = "";
    input.classList.remove('popup__text_type_error')
  });
  popup.querySelectorAll('.popup__text-error').forEach((error) => 
  error.classList.remove('popup__text-error_active'));  
};

function togglePopaps(event) {
  const eventTargetMatches = cl => event.target.matches(cl);  
  switch (eventTargetMatches() === false) {
  case eventTargetMatches(".profile__edit-button"):
    inputNameFormPopupProfile.value = profileName.textContent;
    inputSubameFormPopupProfile.value = profileSubname.textContent;
    openPopup (popupEditProfile);
    break;
  case eventTargetMatches(".profile__add-button"):
    openPopup (popupAddCard);
    break;
  case eventTargetMatches(".popup_edit_profile .popup__button-close"):
    closePopup (popupEditProfile);
    break;
  case eventTargetMatches(".popup_add_cards .popup__button-close"):
    closePopup (popupAddCard);
    break;
  case eventTargetMatches(".popup_zoom_image .popup__button-close"):
    closePopup (popupZoomImage);    
  }
}

function closePopupSubmit() {  
  popupList.forEach((popupType) => {
    closePopup (popupType);
  });
}

function handleFormPopupProfile(evt) {
  evt.preventDefault();

  profileName.textContent = `${inputNameFormPopupProfile.value}`;
  profileSubname.textContent = `${inputSubameFormPopupProfile.value}`;

  closePopupSubmit();
}

function handleLikeClick(type) {
  type.querySelector(".element__group").classList.toggle("element__group_status_active")
}
const createCard = (text, src) => {
  const element = template.querySelector(".element").cloneNode(true);

  element.querySelector(".element__title").textContent = text;
  element.querySelector(".element__mask-group").alt = text;
  element.querySelector(".element__mask-group").src = src;
  element.querySelector(".element__group").addEventListener("click", () => {
    handleLikeClick(element);
  });
  element.querySelector(".element__trash").addEventListener("click", () => {
    element.remove();
  });
  element.querySelector('.element__mask-group').addEventListener('click', () => {
    imagePopupZoomImage.src = src;
    imagePopupZoomImage.alt = text;
    captionPopupZoomImage.textContent = text;
    openPopup (popupZoomImage);
  });
  return element;
}
initialCards.forEach((item) => {
  const name = item.name;
  const link = item.link;
  container.append(createCard(name, link));
});

function handleFormPopupCard(evt) {
  evt.preventDefault();
  const url = `${inputUrlFormPopupCard.value}`;
  const title = `${inputTitleFormPopupCard.value}`;
  if (title && url) {
    container.prepend(createCard(title, url));
    inputTitleFormPopupCard.value = '';
    inputUrlFormPopupCard.value = '';
    closePopupSubmit();
  } 
}

buttonOpenPopupProfileEdit.addEventListener("click", togglePopaps);
buttonOpenPopupAddCard.addEventListener("click", togglePopaps);

buttonClosePopupList.forEach((btn) => {
  btn.addEventListener("click", togglePopaps);
});

const closePopupAlternative = () => {
  popupList.forEach((popup) => {  
    if (popup.classList.contains('popup_status_active')) {
      popup.addEventListener('click', (evt) => {   
        if (evt.target === popup) {
          closePopup(popup);
        }
      });  
      document.addEventListener('keydown', (evt) => {    
        if (evt.code === "Escape" && popup.classList.contains('popup_status_active')) {
        closePopup(popup);
        }
      });  
    };
  });
}  

formPopupEditProfile.addEventListener("submit", handleFormPopupProfile);

formPopupAddCard.addEventListener("submit", handleFormPopupCard);



enableValidation(validationConfig);





