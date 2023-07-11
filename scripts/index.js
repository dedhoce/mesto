const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit_profile");
const popupButtonClose = document.querySelectorAll(".popup__button-close");
const profileName = document.querySelector(".profile__name");
const profileSubname = document.querySelector(".profile__subname");
const popupProfileName = popupEditProfile.querySelector(".popup__text_type_name");
const popupProfileSubname = popupEditProfile.querySelector(".popup__text_type_subname");
const formEditProfile = popupEditProfile.querySelector(".popup__form-edit-profile");
const popupAddCards = document.querySelector(".popup_add_cards");
const popupTitleCards = document.querySelector(".popup__text_type_title");
const popupUrlCards = document.querySelector(".popup__text_type_url");
const elementMaskGroup = document.querySelector(".element__mask-group");
const elementTitle = document.querySelector(".element__title");
const addCardsButton = document.querySelector(".profile__add-button");
const formAddCards = document.querySelector(".popup__form-add-cards");
const popupZoomImage = document.querySelector('.popup_zoom_image');
const popupCaption = document.querySelector('.popup__caption');
const popupGroup = document.querySelector('.popup__group');
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
function togglePopaps(event) {
  if (event.target.matches(".profile__edit-button")) {
    popupProfileName.value = profileName.textContent;
    popupProfileSubname.value = profileSubname.textContent;
    popupEditProfile.classList.add("popup_status_active");
  } else if (event.target.matches(".profile__add-button")) {
    popupTitleCards.placeholder = "Название";
    popupUrlCards.placeholder = "Ссылка на картинку";
    popupAddCards.classList.add("popup_status_active");  
  } else if (event.target.matches(".popup_edit_profile .popup__button-close")) {
    popupEditProfile.classList.remove("popup_status_active");
  } else if (event.target.matches(".popup_add_cards .popup__button-close")) {
    popupAddCards.classList.remove("popup_status_active");
  } else if (event.target.matches(".popup_zoom_image .popup__button-close")) {
    popupZoomImage.classList.remove("popup_status_active");
  }
}

profileEditButton.addEventListener("click", togglePopaps);
addCardsButton.addEventListener("click", togglePopaps);

popupButtonClose.forEach((btn) => {
  btn.addEventListener("click", togglePopaps);
});

function closePopupSubmit() {
  document.querySelectorAll(".popup").forEach((popupType) => {
    popupType.classList.remove("popup_status_active");
  });
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = `${popupProfileName.value}`;
  profileSubname.textContent = `${popupProfileSubname.value}`;

  closePopupSubmit();
}

formEditProfile.addEventListener("submit", formSubmitHandler);

function formSubmitCards(evt) {
  evt.preventDefault();   
  const element = template.querySelector(".element").cloneNode(true);

  element.querySelector(".element__title").textContent = `${popupTitleCards.value}`;
  element.querySelector(".element__mask-group").src = `${popupUrlCards.value}`;
  element.querySelector(".element__group").addEventListener("click", () => {
    element.querySelector(".element__group").classList.toggle("element__group_status_active");
  });
  element.querySelector(".element__trash").addEventListener("click", () => {
    element.remove();
  });
  element.querySelector('.element__mask-group').addEventListener('click', () => {    
    document.querySelector('.popup__zoom-image').src = `${popupUrlCards.value}`;        
    document.querySelector('.popup__caption').textContent = `${popupTitleCards.value}`;
    popupZoomImage.classList.add('popup_status_active');
  });
  if (`${popupTitleCards.value}` && `${popupUrlCards.value}`) {
  container.prepend(element);
  closePopupSubmit();
  } else {
    popupTitleCards.style.border = "1px solid red";
    popupUrlCards.style.border = "1px solid red";
  }
}

formAddCards.addEventListener("submit", formSubmitCards);

const container = document.querySelector(".elements");
const template = document.querySelector("#elements-item-template").content;

initialCards.forEach((item) => {
  const element = template.querySelector(".element").cloneNode(true);

  element.querySelector(".element__title").textContent = item.name;
  element.querySelector(".element__mask-group").src = item.link;
  element.querySelector(".element__group").addEventListener("click", () => {
    element.querySelector(".element__group").classList.toggle("element__group_status_active");
  });
  element.querySelector(".element__trash").addEventListener("click", () => {
    element.remove();
  });
  element.querySelector('.element__mask-group').addEventListener('click', () => {    
    document.querySelector('.popup__zoom-image').src = item.link;        
    document.querySelector('.popup__caption').textContent = item.name;
    popupZoomImage.classList.add('popup_status_active');
  });
  container.append(element);
});