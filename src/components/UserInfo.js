export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._userAvatar =document.querySelector(userAvatarSelector);
    }

    // возвращает объект с данными пользователя
    getUserInfo() {
        const userData = {
            name: this._userName.textContent,
            about: this._userDescription.textContent,
            avatar: this._userAvatar.src
        }
        return userData;
    }

    //принимает данные и добавляет их на страницу
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userDescription.textContent = data.about;
        //this._userAvatar.src = data.avatar;
    }
    setAvatarInfo(data) {
        this._userAvatar.src = data.avatar;
    }
}