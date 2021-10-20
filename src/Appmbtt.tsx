import React, { FC } from 'react';
import { useStore } from './stores/user';
import { Observer } from 'mobx-react';

const Appmbtt: FC = () => {
  console.log('Appmbtt cal')

  const userStore = useStore()
  return (
    <Observer>
      {
        ()=> {
          console.log('Appmbtt Observer cal')
          return (
            <div>Appmbtt:bbb</div>
          )
        }
      }
    </Observer>
  );
};

export default Appmbtt;