import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Input, Modal, Radio, Row, Space, Typography } from 'antd';
import { EventFormType, eventType } from 'models/Event';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';
import { ErrorMessage } from '../ErrorMessage';
import style from './EventForm.module.css';
import { createEventSchema } from './validationSchemes/createEventSchema';
import { editEventSchema } from './validationSchemes/editEventSchema';

type PropsType = {
  isModalVisible: boolean;
  isEditing?: boolean;
  onSubmit: (data: EventFormType) => void;
  onCancel: () => void;
};

export const EventForm: React.FC<PropsType> = ({ isModalVisible, onSubmit, onCancel, isEditing = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<EventFormType>({
    defaultValues: {
      title: '',
      text: '',
      eventType: eventType.minor,
      eventDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    resolver: yupResolver(isEditing ? editEventSchema : createEventSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const onClickSumbit: SubmitHandler<EventFormType> = (data) => {
    console.log('data', data);
    console.log('evt date', moment(data.eventDate).format());
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <>
      <Modal title={isEditing ? 'Edit event' : 'Add event'} visible={isModalVisible} footer={null} onCancel={onCancel}>
        <form className={style.form} action='submit' onSubmit={handleSubmit(onClickSumbit)}>
          <Space direction='vertical'>
            <Row justify='center' align='middle'>
              {errors.title?.message && <ErrorMessage error={errors.title.message} width={300} />}
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Input
                    addonBefore='Enter event title'
                    className={style.field}
                    type='text'
                    placeholder='Title'
                    {...field}
                  />
                )}
              />
            </Row>
            <Row justify='center' align='middle'>
              {errors.text?.message && <ErrorMessage error={errors.text.message} width={300} />}
              <Controller
                name='text'
                control={control}
                render={({ field }) => (
                  <Input
                    className={style.field}
                    addonBefore='Enter event text'
                    type='text'
                    placeholder='Event description'
                    {...field}
                  />
                )}
              />
            </Row>
            <Row justify='center'>
              <Typography.Title level={5}>Select event parameters:</Typography.Title>
            </Row>
            <Row justify='center'>
              {errors.eventDate?.message && <ErrorMessage error={errors.eventDate.message} width={200} />}
              <Controller
                name='eventDate'
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <>
                    <DatePicker
                      picker='date'
                      showTime
                      style={errors.eventDate?.message ? { marginLeft: '15px' } : { marginLeft: 0 }}
                      onChange={(val) => onChange(moment(val).format('YYYY-MM-DD HH:mm:ss'))}
                      format='YYYY-MM-DD HH:mm:ss'
                      onBlur={onBlur}
                      defaultValue={moment(value, 'YYYY-MM-DD HH:mm')}
                    />
                  </>
                )}
              />
            </Row>
            <Row justify='center'>
              {errors.eventType?.message && <ErrorMessage error={errors.eventType.message} />}
              <Controller
                name='eventType'
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Radio.Button value={eventType.minor}>{capitalizeFirstLetter(eventType.minor)}</Radio.Button>
                    <Radio.Button value={eventType.warning}>{capitalizeFirstLetter(eventType.warning)}</Radio.Button>
                    <Radio.Button value={eventType.important}>
                      {capitalizeFirstLetter(eventType.important)}
                    </Radio.Button>
                  </Radio.Group>
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
                Submit
              </Button>
            </Row>
          </Space>
        </form>
      </Modal>
    </>
  );
};
