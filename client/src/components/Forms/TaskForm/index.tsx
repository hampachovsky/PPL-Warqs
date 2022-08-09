import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Modal, Row } from 'antd';
import { Dictionary } from 'constatns/dictionary';
import { TaskFormType } from 'models/ITask';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
  const [isLoading, setIsLoading] = useState(false);
  const [prefText, setPrefText] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<TaskFormType>({
    defaultValues: {
      text: prefText,
    },
    resolver: yupResolver(valdiationSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    reset({ text });
  }, [reset, text]);

  useEffect(() => {
    reset({
      text: '',
    });
  }, [isSubmitSuccessful, reset]);

  const onClickSumbit: SubmitHandler<TaskFormType> = (data) => {
    setIsLoading(true);
    onSubmit(data);
    setIsLoading(false);
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
