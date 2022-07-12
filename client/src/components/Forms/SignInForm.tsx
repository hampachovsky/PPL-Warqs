import React, { useState } from 'react';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import style from './forms.module.css';
import { Button, Input, Space, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { routes } from 'routes';
import { ErrorMessage } from './ErrorMessage';

const validationSchema = yup
  .object()
  .shape({
    username: yup.string().required('Please enter a username'),
    password: yup.string().required('Please enter a password'),
    rememberMe: yup.boolean(),
  })
  .required();

interface IFormInput {
  username: string;
  password: string;
  rememberMe: boolean;
}

// TODO: If Remeber me checked = window.localstorage.set(token) esle nothing...;
export const SignInForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
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
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        Log In
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
            disabled={!!errors}
            className={style.submitBtn}
            size='large'
            type='primary'
            htmlType='submit'
            loading={isLoading}
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
