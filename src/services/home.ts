import {
  AxiosRequestConfig
} from 'axios';
import { RequestService } from 'utils';
import { getMenus, getUsers } from '../../mock/index';
const isMock = process.env.NODE_ENV === 'test';

const login = async (config: AxiosRequestConfig & {
  username: string,
  passWord: string,
  remember: boolean
}): Promise<any> => {
  return isMock
      ? getUsers(config.username.trim(), config.passWord.trim(), config.remember)
      : RequestService.post('/admin-backend/login', { ...config })
}

const menus = async (config: AxiosRequestConfig): Promise<any> => {
  return getMenus(`${config.params.roleType}`, `${config.params.lng}`)
  // return isMock
  //     ? getMenus(`${config.params.roleType}`, `${config.params.lng}`)
  //     : RequestService.get('/menus', { ...config })
}

const home: {
  login: Function,
  menus: Function,
} = {
  login,
  menus,
}

export default home