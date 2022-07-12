import { Layout } from 'antd';
import { Footer } from 'components/Footer';
import React from 'react';

type Props = {
  children: JSX.Element;
};

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className='layout'>
      <Layout.Content style={{ padding: '0 50px', minHeight: '89vh', margin: '16px 0' }}>
        <div style={{ minHeight: '89vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {children}
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};
