import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Space, Typography } from 'antd';
import { Dictionary } from 'constatns/dictionary';
import { RoutesPath } from 'constatns/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { LoadingStatus, SignUpPayload as IFormInput } from 'models/utilsTypes';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { selectUserIsLoading, selectUserStatusSuccess } from 'store/slices/userSlice/selectors';
import { fetchSignUp } from 'store/slices/userSlice/thunk';
import { setLoadingStatus } from 'store/slices/userSlice/userSlice';
import * as yup from 'yup';
import { ErrorMessage } from './ErrorMessage';
import style from './forms.module.css';

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

export const SignUpForm: React.FC = () => {
  const isLoading = useAppSelector(selectUserIsLoading);
  const isSuccess = useAppSelector(selectUserStatusSuccess);
  const error = useAppSelector((state) => state.userReducer.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(fetchSignUp(data));
  };

  if (isSuccess) {
    navigate('/login', { replace: true });
    dispatch(setLoadingStatus(LoadingStatus.IDLE));
  }

  return (
    <div>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        {Dictionary.REGISTER}
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
          {errors.confirmPassword?.message && <ErrorMessage error={errors.confirmPassword.message} />}
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <Input.Password className={style.field} type='password' placeholder='password' {...field} />
            )}
          />

          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            className={style.submitBtn}
            size='large'
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            {Dictionary.REGISTER}
          </Button>
          <div>
            <Typography.Title level={5}>
              {Dictionary.OR} <Link to={RoutesPath.LOGIN}>{Dictionary.LOGIN} now!</Link>
            </Typography.Title>
          </div>
        </Space>
      </form>
    </div>
  );
};
