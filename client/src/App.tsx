import React from 'react';
import 'antd/dist/antd.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import { MainLayout } from 'components/Layouts/MainLayout';
import { AuthLayout } from 'components/Layouts/AuthLayout';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { Home } from 'pages/Home';
import { Events } from 'pages/Events';
import { EventPage } from 'pages/EventPage';

const App: React.FC = () => {
  const isAuth = true;
  return (
    <>
      {isAuth ? (
        <MainLayout>
          <Routes>
            <Route path={routes.HOME} element={<Home />} />
            <Route path={routes.EVENTS} element={<Events />} />
            <Route path={routes.EVENT} element={<EventPage />} />
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
