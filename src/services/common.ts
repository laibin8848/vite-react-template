import {
  AxiosRequestConfig
} from 'axios';
import { RequestService } from 'utils';
import { getMenus, getUsers } from '../../mock/index';
const isMock = process.env.NODE_ENV === 'test';

const captcha = (): Promise<any> => {
  return RequestService.get('/admin-backend/login/captcha')
  // return isMock
  //     ? getUsers()
  //     : RequestService.get('/admin-backend/login/captcha')
}

const common: {
  captcha: Function
} = {
  captcha
}

export default common