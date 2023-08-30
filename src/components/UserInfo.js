export default class UserInfo {
    constructor ({nameSelector, aboutMyselfSelector}) {
        this._name = document.querySelector(nameSelector);
        this._aboutMyself = document.querySelector(aboutMyselfSelector)
    }

    getUserInfo(inputName, inputAboutMyself ) {
        inputName.value = this._name.textContent;
        inputAboutMyself.value = this._aboutMyself.textContent;
    }

    setUserInfo(inputName, inputAboutMyself) {
        this._name.textContent = inputName.value;
        this._aboutMyself.textContent = inputAboutMyself.value;
    }
}