const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('.popup_edit_profile')
const popupButtonClose = popupEditProfile.querySelector('.popup__button-close')
const profileName = document.querySelector('.profile__name')
const profileSubname = document.querySelector('.profile__subname')
const popupProfileName = popupEditProfile.querySelector('.popup__text_type_name')
const popupProfileSubname = popupEditProfile.querySelector('.popup__text_type_subname')
const formEditProfile = popupEditProfile.querySelector('.popup__form-edit-profile')

const elementGroup = document.querySelectorAll('.element__group')
    
function addPopup() {    
    popupProfileName.value = profileName.textContent;
    popupProfileSubname.value = profileSubname.textContent;
    popupEditProfile.classList.add('popup_status_active')
};

function closePopup () {
    popupEditProfile.classList.remove('popup_status_active')
};

profileEditButton.addEventListener('click', addPopup)
popupButtonClose.addEventListener('click', closePopup)

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = `${popupProfileName.value}`;
    profileSubname.textContent = `${popupProfileSubname.value}`;

    closePopup();
};

formEditProfile.addEventListener('submit', formSubmitHandler);

