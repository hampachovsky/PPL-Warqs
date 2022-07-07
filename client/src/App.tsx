import React from 'react';
import 'antd/dist/antd.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import { MainLayout } from 'components/MainLayout';

const App: React.FC = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path={routes.HOME} element={<h1>HOME PAGE</h1>} />
          <Route path={routes.LOGIN} element={<h1>LOGIN PAGE</h1>} />
          <Route path={routes.EVENT} element={<h1>Event PAGE</h1>} />
          <Route path={routes.EVENTS} element={<h1>Events PAGE</h1>} />
          <Route path='*' element={<Navigate to={routes.HOME} />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
