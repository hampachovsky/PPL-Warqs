import { Layout } from 'antd';
import { Footer } from 'components/Footer';
import { Navbar } from 'components/Navbar';
import React from 'react';

type Props = {
  children: JSX.Element;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className='layout'>
      <Layout.Header>
        <Navbar />
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px', minHeight: '100vh', margin: '16px 0' }}>
        <div style={{ minHeight: '280px', padding: '24px', backgroundColor: '#fff' }}>{children}</div>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};
