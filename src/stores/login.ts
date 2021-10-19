import { action, decorate, observable } from "mobx";
import { persist } from 'mobx-persist'
import { isAuthenticated,authenticateSuccess, logout } from 'utils'
export class LoginStore {
  isLogin = !!isAuthenticated()
  userInfo: UserInfoType = {
    userId: 0,
    roleType: 0,
    userName: '',
    avatar: '',
    permissions: []
  }

  lng = 'cn'

  setUserInfo (userInfo: UserInfoType) {
    this.userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }

  getUserInfo () {
    return this.userInfo
  }

  toggleLogin(flag: boolean, token: string) {
    if (flag) {
      authenticateSuccess(token)
      this.isLogin = true
    } else {
      logout()
      this.isLogin = false
      this.setUserInfo({
        userId: 0,
        userName: '',
        avatar: '',
        roleType: 0,
        permissions: []
      })
    }

  }

  getLng () {
    return this.lng
  }

  setLng (lng: string ) {
    this.lng = lng
  }
}

decorate(LoginStore, {
  userInfo: [(persist('userInfo') as any), observable],
  setUserInfo: action,
  getUserInfo: action,
  isLogin: observable,
  toggleLogin: action,
  lng: observable,
  getLng: action,
  setLng: action
})

export default new LoginStore();