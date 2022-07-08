import React from 'react';
import 'antd/dist/antd.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import { MainLayout } from 'components/Layouts/MainLayout';
import { AuthLayout } from 'components/Layouts/AuthLayout';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';

const App: React.FC = () => {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <MainLayout>
          <Routes>
            <Route path={routes.HOME} element={<h1>HOME PAGE</h1>} />
            <Route path={routes.LOGIN} element={<h1>LOGIN PAGE</h1>} />
            <Route path={routes.EVENT} element={<h1>Event PAGE</h1>} />
            <Route path={routes.EVENTS} element={<h1>Events PAGE</h1>} />
            <Route path='*' element={<Navigate to={routes.HOME} />} />
          </Routes>
        </MainLayout>
      ) : (
        <AuthLayout>
          <Routes>
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.REGISTER} element={<Register />} />
            <Route path='*' element={<Navigate to={routes.LOGIN} />} />
          </Routes>
        </AuthLayout>
      )}
    </>
  );
};

export default App;
