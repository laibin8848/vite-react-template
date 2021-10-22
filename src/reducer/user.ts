import { authenticateSuccess, logout } from 'utils'

export const doUserLogin = (userinfo: UserInfoType): object => {
  return {
    type: 'user login',
    reducer(state: IKeyString) {
      localStorage.setItem('userInfo', JSON.stringify(userinfo))
      authenticateSuccess(userinfo.token)
      return {...state, 'userInfo': userinfo, isLogin: true}
    },
  };
};

export const doUserLogout = (): object => {
  return {
    type: 'user logout',
    reducer(state: IKeyString) {
      localStorage.setItem('userInfo', JSON.stringify({}))
      logout()
      return {...state, 'userInfo': {
        userId: 0,
        username: '',
        avatar: ''
      }, isLogin: false}
    },
  };
};

export const switchLang = (lang: string): object => {
  return {
    type: 'switch lang',
    reducer(state: IKeyString) {
      return {...state, 'lang': lang}
    },
  };
};

export const setPermissions = (permissions: string[]): object => {
  return {
    type: 'set permissions',
    reducer(state: IKeyString) {
      return {...state, 'permissions': permissions}
    },
  };
};