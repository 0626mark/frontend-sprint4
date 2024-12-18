export class UserInfo {
    constructor(info) {
      this._name = info.profileName;
      this._about = info.profileDescription;
      this._avatar = info.profileAvatar; 
    }
  
    getInfoUser() {
      const userInfo = {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.textContent,
      };
      return userInfo;
    }
  
    setUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._avatar.src = data.avatar;
    }
  }
  