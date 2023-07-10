const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('.popup_edit_profile')
const popupButtonClose = popupEditProfile.querySelector('.popup__button-close')
const profileName = document.querySelector('.profile__name')
const profileSubname = document.querySelector('.profile__subname')
const popupProfileName = popupEditProfile.querySelector('.popup__text_type_name')
const popupProfileSubname = popupEditProfile.querySelector('.popup__text_type_subname')
const formEditProfile = popupEditProfile.querySelector('.popup__form-edit-profile')
const elementGroup = document.querySelectorAll('.element__group')
const popupAddCards = document.querySelector('.popup_add_cards')
const popupTitleCards = document.querySelector('.popup__text_type_title')
const popupUrlCards = document.querySelector('.popup__text_type_url')
const elementMaskGroup = document.querySelector('.element__mask-group')
const elementTitle = document.querySelector('.element__title')
const addCardsButton = document.querySelector('.profile__add-button')
const formAddCards = document.querySelector('.popup__form-add-cards')
const popupButtonCloseWinAdd = popupAddCards.querySelector('.popup__button-close_window-add')

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];    
function addPopupEditProfile() {    
    popupProfileName.value = profileName.textContent;
    popupProfileSubname.value = profileSubname.textContent;
    popupEditProfile.classList.add('popup_status_active')
};

function closePopupEditProfile () {
    popupEditProfile.classList.remove('popup_status_active')
};

profileEditButton.addEventListener('click', addPopupEditProfile)
popupButtonClose.addEventListener('click', closePopupEditProfile)

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = `${popupProfileName.value}`;
    profileSubname.textContent = `${popupProfileSubname.value}`;

    closePopupEditProfile();
};

formEditProfile.addEventListener('submit', formSubmitHandler);

function addPopupAddCards() {    
    popupTitleCards.placeholder = 'Название'
    popupUrlCards.placeholder = 'Ссылка на картинку'
    popupAddCards.classList.add('popup_status_active')
};

function closePopupAddCards () {
    popupAddCards.classList.remove('popup_status_active')
};

addCardsButton.addEventListener('click', addPopupAddCards);
popupButtonCloseWinAdd.addEventListener('click', closePopupAddCards);

function formSubmitCards(evt) {
    evt.preventDefault();

    elementTitle.textContent = `${popupTitleCards.value}`;
    elementMaskGroup.src = `${popupUrlCards.value}`;

    closePopupEditProfile();
};

formAddCards.addEventListener('submit', formSubmitCards);

const container = document.querySelector('.elements')
const template = document.querySelector('#elements-item-template').content

 

 
initialCards.forEach((elementName) => {
    const element = template.querySelector('.element').cloneNode(true);

    element.querySelector('.element__title').textContent = elementName.name;
    element.querySelector('.element__mask-group').src = elementName.link;
    element.querySelector('.element__group').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__group_status_active')
    })
    
    container.append(element)  
 });
 
 
 