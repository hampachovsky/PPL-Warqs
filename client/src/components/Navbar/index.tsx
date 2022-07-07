import { Col, Image, Menu, MenuProps, Row } from 'antd';
import React, { useState } from 'react';
import style from './Navbar.module.css';
import { MenuOutlined } from '@ant-design/icons';
import logoUrl from 'assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'routes';

// , onClick: () => useNavigate('/', { replace: true })
export const Navbar: React.FC = () => {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();
  const menuItems: MenuProps['items'] = [
    { label: 'Calendar', key: '/', onClick: () => navigate('/', { replace: true }) },
    { label: 'Events', key: 'events', onClick: () => navigate('/events', { replace: true }) },
    { label: 'Logout', key: 'logout', onClick: () => navigate('/logout', { replace: true }) },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Row justify='space-around'>
        <Col span={5}>
          <Link className={style.logoWraper} to={routes.HOME}>
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
