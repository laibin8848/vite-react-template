import { createContext, useContext } from 'react';
import miniRedux from 'libs/mini-redux';
const appStoreContext = createContext();

const Storer = miniRedux({
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
  context: appStoreContext
});

export const Provider = Storer.Provider;

export const useAppStore = () => {
  return useContext(appStoreContext);
}