import React, { FC, useState, useEffect, memo, useMemo } from 'react';
import { Menu, Layout } from 'antd';
import {
  TableOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  FileExcelOutlined,
  MehOutlined,
  HomeOutlined
} from '@ant-design/icons';
import style from './index.module.less'

const { Sider } = Layout;
const { SubMenu } = Menu;

interface ISlideBar {
  history: any;
  menus: Array<CompItemType>;
  permissions?: Array<string>;
  collapsed: boolean;
}

const SlideBar: FC<ISlideBar> = ({
  history,
  menus,
  collapsed,
  permissions
}: ISlideBar) => {
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard'])

  const renderIcon = (icon: string) => {
    if (icon === 'table') {
      return <TableOutlined />
    } else if (icon === 'chart') {
      return <BarChartOutlined />
    } else if (icon === 'components') {
      return <AppstoreOutlined />
    } else if (icon === 'excel') {
      return <FileExcelOutlined />
    } else if (icon === '404') {
      return <MehOutlined />
    } else if (icon === 'dashboard') {
      return <HomeOutlined />
    }
  }

  const selectMenuItem = (path: string) => {
    history.push(path)
  }

  const onOpenChange = (item: string[]) => {
    setOpenKeys(item)
  }

  const onMenuItemClick = (item: { keyPath: string[], key: string }) => {
    sessionStorage.setItem('openKeys', JSON.stringify(item.keyPath))
    sessionStorage.setItem('selectedKeys', JSON.stringify([item.key]))
    setSelectedKeys([item.key])
    setOpenKeys(item.keyPath)
  }

  useEffect(() => {
    const openKeys = sessionStorage.getItem('openKeys'),
    selectedKeys = sessionStorage.getItem('selectedKeys')
    setOpenKeys(openKeys ? JSON.parse(openKeys) : [])
    setSelectedKeys(selectedKeys ? JSON.parse(selectedKeys) : ['dashboard'])
  }, [])

  return <Sider trigger={null} collapsible
        collapsed={collapsed}>
      <Menu className={style['menus']}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          mode="inline"
          theme="dark"
          // @ts-ignore
          onOpenChange={onOpenChange}
          onClick={onMenuItemClick}
        >
          {
            menus && menus.map((menu: CompItemType) => {
              const {component, key, path, sub, icon} = menu
              {
                if(!permissions?.includes(key)) {
                  return
                }
              }
              return (
                sub && sub.length
                  ? <SubMenu key={key} icon={icon && renderIcon(icon)} title={component}>
                    {
                      sub && sub.map(((s: CompItemType) => {
                        const {component, path, key} = s
                        if(!permissions?.includes(key)) {
                          return
                        }
                        return (<Menu.Item key={key}
                                  onClick={e => selectMenuItem(path)}>
                                {component}
                              </Menu.Item>)
                      }))
                    }
                  </SubMenu>
                  : <Menu.Item key={key}
                      icon={icon && renderIcon(icon)}
                      onClick={e => selectMenuItem(path)}>
                    {component}
                  </Menu.Item>
              )
            })
          }
        </Menu>
    </Sider>
}

export default memo(SlideBar);
