import { useTranslation } from 'react-i18next';
import { message } from 'antd';

const useChangeLang = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    message.success(t('lang.changeLangSuccess'))
  };

  return {
    t,
    changeLanguage
  }
}

export default useChangeLang;