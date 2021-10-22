import React, { FC, useEffect, useState, memo } from 'react';
import { Menu, Layout, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TranslationOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Store from 'stores';
import style from './index.module.less'
import classNames from 'classnames';
import { home } from 'services';
import AppRouter from 'components/Router';
import SideBar from 'layout/SideBar'
import Footer from 'layout/Footer'
import { useChangeLang } from 'hooks';
import { baseMenus } from 'components/Router/baseMenus';
import { doUserLogout, switchLang } from 'reducer/user';

const { Header, Content } = Layout;
interface IHome {
  history: any
}

const Home: FC<IHome> = ({history}: IHome) => {
  const [collapsed, setCollapsed] = useState(false)
  // const [userInfo, setUserInfo] = useState<UserInfoType>({
  //   userId: 0,
  //   avatar: '',
  //   userName: '',
  //   roleType: 0,
  //   permissions: []
  // })
  const [selectedIndex, setSelectedIndex] = useState<number>(1)
  const storeInstance = Store.getInstance();
  const storeState = storeInstance.getStoreContext()
  const { changeLanguage } = useChangeLang();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const initUserInfo = async () => {
    // const userInfoStorage = localStorage.getItem('userInfo');
    // const userInfo = userInfoStorage ? JSON.parse(userInfoStorage) : loginStore.getUserInfo();
    // const { userId } = userInfo
    const res = await home.menus({params: { userId: storeState.userInfo.userId }});
    // const permissions: string[] = ['homeRoot'];
    // res.data.userMenus.map((item: any)=> permissions.push(item.menuCode));
    // userInfo.permissions = permissions;
    // setUserInfo(userInfo);
    // loginStore.setUserInfo(userInfo);
  }


  const notLogin = (
    <div>
      <Link to={{pathname: '/login', state: {from: location}}} style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
      <img src={''} alt=""/>
    </div>
  )

  const headMenu = (
    <Menu>
      <Menu.Item key="1">
        <span onClick={
          ()=> {
            storeInstance.storer.dispatch(doUserLogout());
          }
        }>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  const login = (
    <Dropdown overlay={headMenu} trigger={['click']} arrow>
      <div className={style['avatar-wrapper']}>
        <img src={storeState.userInfo.avatar} alt=""
          className={style['avatar']}/>
        <DownOutlined />
      </div>
    </Dropdown>
  )

  const translationOptions = () => {
    const options = [
      {text: '中文', lng: 'cn', key: 1},
      {text: 'English', lng: 'en', key: 2},
    ]
    return (<Menu>
      {
        options && options.map(option => (
          <Menu.Item key={option.key}>
            <span
              className={
                selectedIndex === option.key
                ? style['is-translationOpt-selected']
                : ''
              }
              onClick={() => {
                changeLanguage(option.lng)
                storeInstance.storer.dispatch(switchLang(option.lng));
                setSelectedIndex(option.key)
            }}>{option.text}</span>
          </Menu.Item>
        ))
      }
    </Menu>)
  }

  const renderTranslation = () => (
    <Dropdown overlay={translationOptions} trigger={['click']} arrow>
      <div className={style['translate']}>
        <TranslationOutlined style={{marginRight: 10}}/>
        <DownOutlined />
      </div>
    </Dropdown>
  )

  const renderContent = () => (
    <>
      <Header className={
          classNames(
            style["site-layout-background"],
            style['header']
          )}>
        {React.createElement(
            collapsed
              ? MenuUnfoldOutlined
              : MenuFoldOutlined,
        {
          className: 'trigger',
          onClick: toggleCollapsed,
        })}
        {renderTranslation()}
        {login}
        {storeState.isLogin ? login : notLogin}
      </Header>
      <Content
        className={style["site-layout-background"]}
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <AppRouter/>
      </Content>
      <Footer />
    </>
  )

  useEffect(() => {
    initUserInfo()
  }, [])

  return (
    <Layout>
      {
        <SideBar menus={baseMenus}
          permissions={storeState.permissions}
          collapsed={collapsed}
          history={history}
        />
      }
      <Layout className={style["site-layout"]}>
          {renderContent()}
      </Layout>
    </Layout>
  );
};

export default memo(Home);