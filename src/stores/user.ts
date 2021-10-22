import { createContext, useContext } from 'react';
import miniRedux from 'libs/mini-redux';
const UserContext = createContext();

const { Provider} = miniRedux({
  isDev: false,
  initialState: {},
  context: UserContext
});

export const useUserStore = () => {
  return useContext(UserContext);
}

export default {
  userProvider: Provider,
  useUserStore
}