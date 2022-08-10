import 'antd/dist/antd.min.css';
import { AuthLayout } from 'components/Layouts/AuthLayout';
import { MainLayout } from 'components/Layouts/MainLayout';
import { Preloader } from 'components/Preloader';
import { RoutesPath } from 'constatns/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { EventPage } from 'pages/EventPage';
import { Events } from 'pages/Events';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { selectUserIsLoading } from 'store/slices/userSlice/selectors';
import { fetchUserData } from 'store/slices/userSlice/thunk';

const App: React.FC = () => {
  const isLoading = useAppSelector(selectUserIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return isLoading ? (
    <Preloader />
  ) : (
    <Routes>
      <Route
        path={RoutesPath.LOGIN}
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path={RoutesPath.REGISTER}
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path={RoutesPath.HOME}
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path={RoutesPath.EVENTS}
        element={
          <MainLayout>
            <Events />
          </MainLayout>
        }
      />
      <Route
        path={RoutesPath.EVENT}
        element={
          <MainLayout>
            <EventPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
