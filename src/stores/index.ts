import { createContext, useContext } from 'react';
import miniRedux from 'libs/mini-redux';

export default class appStore {
  static instance: any;
  contextId: any;
  storer: any;
  Provider: any;
  getStoreContext: Function;

  constructor() {
    console.log('constructor')
    this.contextId = createContext();
    const { Provider, store } = miniRedux({
      isDev: false,
      initialState: {
        userInfo: {
          userId: 0,
          userName: 'default',
          avatar: ''
        },
        permissions: [],
        lang: 'cn'
      },
      context: this.contextId
    });
    this.Provider = Provider;
    this.storer = store;
    this.getStoreContext = ()=> {
      return useContext(this.contextId)
    };
  }

  public static getInstance(): any {
    if(!this.instance) {
      this.instance = new appStore();
    }
    return this.instance;
  }
}