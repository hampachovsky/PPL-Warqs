import { MenuOutlined } from '@ant-design/icons';
import { Col, Image, Menu, MenuProps, Row } from 'antd';
import logoUrl from 'assets/logo.svg';
import { MenuItems } from 'constatns/menuItems';
import { RoutesPath } from 'constatns/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetEventsState } from 'store/slices/eventSlice/eventSlice';
import { resetTasksState } from 'store/slices/taskSlice/taskSlice';
import { logout } from 'store/slices/userSlice/userSlice';
import style from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userReducer.user?.username);
  const [current, setCurrent] = useState(location.pathname);

  const menuItems: MenuProps['items'] = [
    { label: MenuItems.CALENDAR, key: '/', onClick: () => navigate(RoutesPath.HOME, { replace: true }) },
    { label: MenuItems.EVENTS, key: '/events', onClick: () => navigate(RoutesPath.EVENTS, { replace: true }) },
    {
      label: `${MenuItems.LOGOUT} (${username})`,
      key: 'logout',
      onClick: () => {
        dispatch(logout());
        dispatch(resetEventsState());
        dispatch(resetTasksState());
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
