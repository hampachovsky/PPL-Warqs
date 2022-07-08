import { Layout } from 'antd';
import React from 'react';

const { Content, Footer } = Layout;

type Props = {
  children: JSX.Element;
};

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className='layout'>
      <Content style={{ padding: '0 50px', minHeight: '89vh', margin: '16px 0' }}>
        <div style={{ minHeight: '89vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>PPL Warqs ©2022 Created by Oleksandr Novak</Footer>
    </Layout>
  );
};
