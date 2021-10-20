import React, { FC } from 'react';
import { useStore } from './stores/user';

const Appmbtt: FC = () => {

  const userStore = useStore()

  return (
    <div>Appmbtt:{userStore.roleType}</div>
  );
};

export default Appmbtt;