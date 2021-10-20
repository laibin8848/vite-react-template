import React, { FC } from 'react';
import { store, StoreContext, useStore } from './stores/user';
import Appmbt from './Appmbt'
import Appmbtt from './Appmbtt'

const Appmb: FC = () => {
  const userStore = useStore()
  return (
    <StoreContext.Provider value={store}>
      <button onClick={()=> {userStore.count++}}>fuck</button>
      <Appmbt></Appmbt>
      <Appmbtt></Appmbtt>
    </StoreContext.Provider>
  )
};

export default Appmb;