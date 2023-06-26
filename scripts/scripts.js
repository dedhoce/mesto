const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditProfile = document.querySelector('.popup_edit_profile')
const popupButtonClose = popupEditProfile.querySelector('.popup__button-close')

function togglePopup() {
    popupEditProfile.classList.toggle('popup_status_active')
}

profileEditButton.addEventListener('click', togglePopup)
popupButtonClose.addEventListener('click', togglePopup)

function profileEditForm () {
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
const popupProfileName = document.querySelector('.popup__text_profile-name');
const popupProfileSubname = document.querySelector('.popup__text_profile-subname');

    popupProfileName.value = profileName.textContent;
    popupProfileSubname.value = profileSubname.textContent;   
}
profileEditForm();

const popupButtonSave = document.querySelector('.popup__button-save')

function formSubmitHandler(evt) {
    evt.preventDefault();

    const profileName = document.querySelector('.profile__name');
    const profileSubname = document.querySelector('.profile__subname');
    const popupProfileName = document.querySelector('.popup__text_profile-name');
    const popupProfileSubname = document.querySelector('.popup__text_profile-subname');    

    profileName.textContent = popupProfileName.value;
    profileSubname.textContent = popupProfileSubname.value;

    togglePopup();
  };

  popupButtonSave.addEventListener('click', formSubmitHandler);
  popupButtonSave.addEventListener('submit', formSubmitHandler);
