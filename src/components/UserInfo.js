export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
    }

    getUserInfo() {
        const userData = {
            userName: this._userName.textContent,
            userDescription: this._userDescription.textContent
        }
        return userData;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userDescription.textContent = data.job;
    }
}