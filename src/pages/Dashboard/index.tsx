import React from 'react';
import { useChangeLang } from 'hooks';

const Dashboard = () => {
  const { t } = useChangeLang();

  return (
    <div>
      {t('greet')}
    </div>
  )
}

export default Dashboard