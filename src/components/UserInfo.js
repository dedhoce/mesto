export default class UserInfo {
    constructor ({nameSelector, aboutMyselfSelector}) {
        this._name = document.querySelector(nameSelector);
        this._aboutMyself = document.querySelector(aboutMyselfSelector)
    }

    getUserInfo() {
        const data = {}        
        data.name = this._name.textContent;
        data.aboutMyself = this._aboutMyself.textContent;
        return data
    }

    setUserInfo(data) {        
        this._name.textContent = data.name;
        this._aboutMyself.textContent = data.aboutMyself;
    }
}
