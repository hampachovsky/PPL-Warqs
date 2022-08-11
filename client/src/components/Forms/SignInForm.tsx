import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Space, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Dictionary } from 'constatns/dictionary';
import { RoutesPath } from 'constatns/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useClearUserError } from 'hooks/useClearUserError';
import { SignInPayload as IFormInput } from 'models/utilsTypes';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { selectUserIsLoading } from 'store/slices/userSlice/selectors';
import { fetchSignIn } from 'store/slices/userSlice/thunk';
import * as yup from 'yup';
import { ErrorMessage } from './ErrorMessage';
import style from './forms.module.css';

const validationSchema = yup
  .object()
  .shape({
    username: yup.string().required('Please enter a username'),
    password: yup.string().required('Please enter a password'),
    rememberMe: yup.boolean(),
  })
  .required();

export const SignInForm: React.FC = () => {
  const isLoading = useAppSelector(selectUserIsLoading);
  const error = useAppSelector((state) => state.userReducer.error);
  const dispatch = useAppDispatch();
  const { handleClear } = useClearUserError();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
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
        {Dictionary.LOGIN}
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
            loading={isLoading}
          >
            {Dictionary.LOGIN}
          </Button>
          <div>
            <Typography.Title level={5}>
              Or{' '}
              <Link to={RoutesPath.REGISTER} onClick={handleClear}>
                {Dictionary.REGISTER} now!
              </Link>
            </Typography.Title>
          </div>
        </Space>
      </form>
    </div>
  );
};
