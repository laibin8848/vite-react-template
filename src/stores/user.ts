import { createContext, useContext } from 'react';
import miniRedux from 'libs/mini-redux';
const appStoreContext = createContext();

const { Provider } = miniRedux({
  isDev: false,
  initialState: {},
  context: appStoreContext
});

export const useAppStore = () => {
  return useContext(appStoreContext);
}

export default {
  Provider,
  useAppStore
}