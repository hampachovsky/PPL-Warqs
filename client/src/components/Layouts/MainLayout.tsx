import { Layout } from 'antd';
import { Navbar } from 'components/Navbar';
import React from 'react';

const { Header, Content, Footer } = Layout;

type Props = {
  children: JSX.Element;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className='layout'>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: '0 50px', minHeight: '100vh', margin: '16px 0' }}>
        <div style={{ minHeight: '280px', padding: '24px', backgroundColor: '#fff' }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>PPL Warqs ©2022 Created by Oleksandr Novak</Footer>
    </Layout>
  );
};
