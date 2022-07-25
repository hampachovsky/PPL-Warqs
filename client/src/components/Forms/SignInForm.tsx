import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import style from './forms.module.css';
import { Button, Input, Space, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { routes } from 'routes';
import { ErrorMessage } from './ErrorMessage';
import { LoadingStatus, SignInPayload as IFormInput } from 'models/utilsTypes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchSignIn } from 'store/slices/userSlice/thunk';

const validationSchema = yup
  .object()
  .shape({
    username: yup.string().required('Please enter a username'),
    password: yup.string().required('Please enter a password'),
    rememberMe: yup.boolean(),
  })
  .required();

// TODO: If Remeber me checked = window.localstorage.set(token) esle nothing...;
export const SignInForm: React.FC = () => {
  const status = useAppSelector((state) => state.userReducer.status);
  const error = useAppSelector((state) => state.userReducer.error);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<IFormInput>({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await dispatch(fetchSignIn(data));
  };

  return (
    <div>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        Log In
      </Typography.Title>
      <form action='submit' onSubmit={handleSubmit(onSubmit)}>
        <Space align='center' direction='vertical'>
          {error && <ErrorMessage error={error} />}
          {errors.username?.message && <ErrorMessage error={errors.username.message} />}
          <Controller
            name='username'
            control={control}
            render={({ field }) => <Input className={style.field} type='text' placeholder='username' {...field} />}
          />
          {errors.password?.message && <ErrorMessage error={errors.password.message} />}
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input.Password className={style.field} type='password' placeholder='password' {...field} />
            )}
          />
          <Controller
            name='rememberMe'
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} {...field}>
                <Typography.Title level={5}>Remember me</Typography.Title>
              </Checkbox>
            )}
          />

          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            className={style.submitBtn}
            size='large'
            type='primary'
            htmlType='submit'
            loading={status === LoadingStatus.LOADING}
          >
            Log in
          </Button>
          <div>
            <Typography.Title level={5}>
              Or <Link to={routes.REGISTER}>register now!</Link>
            </Typography.Title>
          </div>
        </Space>
      </form>
    </div>
  );
};
