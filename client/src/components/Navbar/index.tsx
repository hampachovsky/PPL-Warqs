import { MenuOutlined } from '@ant-design/icons';
import { Col, Image, Menu, MenuProps, Row } from 'antd';
import logoUrl from 'assets/logo.svg';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesPath } from 'constatns/routes';
import { logout } from 'store/slices/userSlice/userSlice';
import style from './Navbar.module.css';
import { MenuItems } from 'constatns/menuItems';

export const Navbar: React.FC = () => {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.userReducer.user?.username);
  const dispatch = useAppDispatch();
  const menuItems: MenuProps['items'] = [
    { label: MenuItems.CALENDAR, key: '/', onClick: () => navigate(RoutesPath.HOME, { replace: true }) },
    { label: MenuItems.EVENTS, key: 'events', onClick: () => navigate(RoutesPath.EVENTS, { replace: true }) },
    {
      label: `${MenuItems.LOGOUT} (${username})`,
      key: 'logout',
      onClick: () => {
        dispatch(logout());
        navigate(RoutesPath.LOGIN, { replace: true });
      },
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Row justify='space-around'>
        <Col span={5}>
          <Link className={style.logoWraper} to={RoutesPath.HOME}>
            <Image className={style.logo} preview={false} src={logoUrl} />
          </Link>
        </Col>
        <Col span={16}>
          <Menu
            className={style.menu}
            theme='dark'
            mode='horizontal'
            onClick={onClick}
            selectedKeys={[current]}
            items={menuItems}
            overflowedIndicator={<MenuOutlined style={{ fontSize: '20px' }} />}
          ></Menu>
        </Col>
      </Row>
    </>
  );
};
