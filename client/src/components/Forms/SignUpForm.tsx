import React from 'react';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import style from './forms.module.css';
import { Button, Input, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { routes } from 'routes';
import { ErrorMessage } from './ErrorMessage';

const validationSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .min(3, 'Username must be greater than 3 characters')
      .max(32, 'Username must be less than 32 characters')
      .required('Please enter a username'),
    password: yup
      .string()
      .min(3, 'Password must be greater than 4 characters')
      .max(32, 'Password must be less than 64 characters')
      .required('Please enter a password'),
    confirmPassword: yup
      .string()
      .required('Please confirm a password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

interface IFormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

// TODO: If Remeber me checked = window.localstorage.set(token) esle nothing...;
export const SignUpForm: React.FC = () => {
  const isLoading = false;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        Register
      </Typography.Title>
      <form action='submit' onSubmit={handleSubmit(onSubmit)}>
        <Space align='center' direction='vertical'>
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
          {errors.confirmPassword?.message && <ErrorMessage error={errors.confirmPassword.message} />}
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <Input.Password className={style.field} type='password' placeholder='password' {...field} />
            )}
          />

          <Button
            disabled={false}
            className={style.submitBtn}
            size='large'
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Register
          </Button>
          <div>
            <Typography.Title level={5}>
              Or <Link to={routes.LOGIN}>login now!</Link>
            </Typography.Title>
          </div>
        </Space>
      </form>
    </div>
  );
};
