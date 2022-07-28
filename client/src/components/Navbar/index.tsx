import { MenuOutlined } from '@ant-design/icons';
import { Col, Image, Menu, MenuProps, Row } from 'antd';
import logoUrl from 'assets/logo.svg';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesPath } from 'constatns/routes';
import { logout } from 'store/slices/userSlice/userSlice';
import style from './Navbar.module.css';

// , onClick: () => useNavigate('/', { replace: true })
export const Navbar: React.FC = () => {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.userReducer.user?.username);
  const dispatch = useAppDispatch();
  const menuItems: MenuProps['items'] = [
    { label: 'Calendar', key: '/', onClick: () => navigate(RoutesPath.HOME, { replace: true }) },
    { label: 'Events', key: 'events', onClick: () => navigate(RoutesPath.EVENTS, { replace: true }) },
    { label: `Logout (${username})`, key: 'logout', onClick: () => dispatch(logout()) },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
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
