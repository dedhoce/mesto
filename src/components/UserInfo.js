export default class UserInfo {
    constructor ({nameSelector, aboutMyselfSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._aboutMyself = document.querySelector(aboutMyselfSelector);
        this._avatar = document.querySelector(avatarSelector)        
    }

    getUserInfo() {              
        return {
            name: this._name.textContent,
            subname: this._aboutMyself.textContent,
            avatar: this._avatar.src            
        }
    }

    setUserInfo(data) {               
        this._name.textContent = data.name;
        this._aboutMyself.textContent = data.subname;        
        this._name.id = data.idProfile                    
    }
    

    setAvatarImage(data) {
        this._avatar.src = data.avatar
    }

    getUserId() {                
        return this._name.id
    }
}
