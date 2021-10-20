import React, { FC, useEffect, useState } from 'react';
import { store, StoreContext } from './stores/user';
import Appmbt from './Appmbt'
import Appmbtt from './Appmbtt'

const Appmb: FC = () => {
  const [dd, setdd] = useState({
    roleType: 0
  })

  useEffect(()=> {
    console.log('dd', dd.roleType)
  }, [dd])
  return (
    <StoreContext.Provider value={dd}>
      <button onClick={()=> {setdd({roleType: Math.random()})}}>fuck</button>
      <Appmbt></Appmbt>
      <Appmbtt></Appmbtt>
    </StoreContext.Provider>
  )
};

export default Appmb;