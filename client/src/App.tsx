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
import { Navigate, Route, Routes } from 'react-router-dom';
import { selectUserIsLoading } from 'store/slices/userSlice/selectors';
import { fetchUserData } from 'store/slices/userSlice/thunk';

const App: React.FC = () => {
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);
  const isLoading = useAppSelector(selectUserIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {isAuth ? (
        <MainLayout>
          <Routes>
            <Route path={RoutesPath.HOME} element={<Home />} />
            <Route path={RoutesPath.EVENTS} element={<Events />} />
            <Route path={RoutesPath.EVENT} element={<EventPage />} />
            <Route path='*' element={<Navigate to={RoutesPath.HOME} />} />
          </Routes>
        </MainLayout>
      ) : (
        <AuthLayout>
          <Routes>
            <Route path={RoutesPath.LOGIN} element={<Login />} />
            <Route path={RoutesPath.REGISTER} element={<Register />} />
            <Route path='*' element={<Navigate to={RoutesPath.LOGIN} />} />
          </Routes>
        </AuthLayout>
      )}
    </>
  );
};

export default App;
