import { isAuthenticated, authenticateSuccess, logout } from 'utils'

export const doUserLogin = (userinfo: UserInfoType): object => {
  return {
    type: 'user login',
    reducer(state: IKeyString) {
      localStorage.setItem('userInfo', JSON.stringify(userinfo))
      authenticateSuccess(userinfo.token)
      return {...state, 'userInfo': userinfo}
    },
  };
};

export const doUserLogout = (): object => {
  return {
    type: 'user logout',
    reducer(state: IKeyString) {
      debugger
      localStorage.setItem('userInfo', JSON.stringify({}))
    },
  };
};

export const switchLang = (lang: string): object => {
  return {
    type: 'switch lang' + lang,
    reducer(state: IKeyString) {
      debugger
      localStorage.setItem('userInfo', JSON.stringify({}))
    },
  };
};