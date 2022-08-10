import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Modal, Row } from 'antd';
import { Dictionary } from 'constatns/dictionary';
import { useAppSelector } from 'hooks/redux';
import { TaskFormType } from 'models/ITask';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { selectTasksIsLoading } from 'store/slices/taskSlice/selectors';
import * as yup from 'yup';
import { ErrorMessage } from '../ErrorMessage';
import style from './TaskForm.module.css';

const valdiationSchema = yup
  .object({
    text: yup.string().required('Text is required!').min(2, 'Too Short!').max(200, 'Too Long!'),
  })
  .required();

type PropsType = {
  isModalVisible: boolean;
  isEditing?: boolean;
  text?: string;
  onSubmit: (data: TaskFormType) => void;
  onCancel: () => void;
};

export const TaskForm: React.FC<PropsType> = ({ isModalVisible, onSubmit, onCancel, isEditing = false, text = '' }) => {
  const isLoading = useAppSelector(selectTasksIsLoading);
  const error = useAppSelector((state) => state.taskReducer.error);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<TaskFormType>({
    defaultValues: {
      text: '',
    },
    resolver: yupResolver(valdiationSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    reset({ text });
  }, [reset, text]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onClickSumbit: SubmitHandler<TaskFormType> = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <Modal
        title={isEditing ? Dictionary.EDIT_TASK : Dictionary.ADD_TASK}
        visible={isModalVisible}
        footer={null}
        onCancel={onCancel}
      >
        <form className={style.form} action='submit' onSubmit={handleSubmit(onClickSumbit)}>
          {error && <ErrorMessage error={error} />}
          <Row justify='center' align='middle'>
            {errors.text?.message && <ErrorMessage error={errors.text.message} width={300} />}
            <Controller
              name='text'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  addonBefore='Enter tast text'
                  className={style.field}
                  type='text'
                  placeholder='Task'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Row>
          <Row justify='center'>
            <Button
              disabled={!isDirty || !isValid || isSubmitting}
              className={style.submitBtn}
              size='large'
              type='primary'
              htmlType='submit'
              loading={isLoading}
            >
              {Dictionary.SUBMIT}
            </Button>
          </Row>
        </form>
      </Modal>
    </>
  );
};
