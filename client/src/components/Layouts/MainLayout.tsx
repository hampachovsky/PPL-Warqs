import { Layout } from 'antd';
import { Footer } from 'components/Footer';
import { Navbar } from 'components/Navbar';
import { RoutesPath } from 'constatns/routes';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);
  let location = useLocation();
  if (!isAuth) return <Navigate to={RoutesPath.LOGIN} state={{ from: location }} replace />;
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
