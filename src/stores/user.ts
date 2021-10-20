import { observable } from "mobx";
import { createContext, useContext } from 'react';

const userInfo: UserInfoType = {
  userId: 0,
  userName: '',
  avatar: '',
  roleType: 0,
  permissions: []
}

export const store = observable(userInfo)

export const StoreContext = createContext({
  roleType: 0
})

export const useStore = () => {
  return useContext(StoreContext)
}