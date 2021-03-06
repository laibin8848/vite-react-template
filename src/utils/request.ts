import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios';
import { message } from "antd";
import { isAuthenticated } from 'utils';
// import { useStore } from 'stores';

export interface IAPI {
  getInstance(): AxiosInstance | null;
}

export default class API implements IAPI {
  private api: AxiosInstance | null = null;

  private created(config: AxiosRequestConfig): void {
    this.api = axios.create(config);
  }

  private handleInterceptors() {
    this.api && this.api.interceptors.request.use((config: AxiosRequestConfig) => {
      config['headers'] = {
        'x-access-token': isAuthenticated()
      }
      return config
    }, (err: AxiosError) => {
      return Promise.reject(err);
    });

    this.api && this.api.interceptors.response.use(async (res: AxiosResponse) => {
      // @todo
      const {status, data} = res
      if (status === 200) {
        if(data.code === 'E000') {
          return data
        } else {
          //todo 过期处理
          if(data.code === 'E401') {
            // const { loginStore } = useStore()
            // loginStore.toggleLogin(false);
          }
          message.error(data.message || '请求错误！');
          return Promise.reject(data.message);
        }
      }
    }, (err: AxiosError) => {
      return Promise.reject(err);
    })
  }

  constructor(config: AxiosRequestConfig) {
    this.created(config);
    this.handleInterceptors();
  }

  public getInstance(): AxiosInstance | null{
    return this.api;
  }
}

export const mainAPI = new API({
  baseURL: `//${document.domain}/app`
}).getInstance();

export const RequestService = new API({
  baseURL: ''
}).getInstance();