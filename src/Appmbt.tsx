import React, { FC } from 'react';
import { useStore } from './stores/user';
import { Observer } from 'mobx-react';

const Appmbt: FC = () => {
  console.log('Appmbt cal')

  const userStore = useStore()
  return (
    <Observer>
      {
        ()=> {
          console.log('Appmbt Observer cal')
          return (
            <div>Appmbt:{userStore.count}</div>
          )
        }
      }
    </Observer>
  );
};

export default Appmbt;