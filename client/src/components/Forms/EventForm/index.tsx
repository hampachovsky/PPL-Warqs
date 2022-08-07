import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Input, Modal, Radio, Row, Space, Typography } from 'antd';
import { DateFormat } from 'constatns/formats';
import { useAppSelector } from 'hooks/redux';
import { eventType, IEvent } from 'models/Event';
import { EventPayloadType as EventFormType } from 'models/utilsTypes';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { selectEventsIsLoading } from 'store/slices/eventSlice/selectors';
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
  event?: IEvent | null;
};

export const EventForm: React.FC<PropsType> = ({ isModalVisible, onSubmit, onCancel, isEditing = false, event }) => {
  const isLoading = useAppSelector(selectEventsIsLoading);
  const error = useAppSelector((state) => state.eventReducer.error);

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
      eventDate: moment().format(DateFormat.WITH_SECONDS_FORMAT),
    },

    resolver: yupResolver(isEditing ? editEventSchema : createEventSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const onClickSumbit: SubmitHandler<EventFormType> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    reset({
      title: event?.title,
      text: event?.text,
      eventType: event?.eventType,
      eventDate: moment(event?.eventDate).format(DateFormat.WITH_SECONDS_FORMAT),
    });
  }, [event, reset]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Modal title={isEditing ? 'Edit event' : 'Add event'} visible={isModalVisible} footer={null} onCancel={onCancel}>
        <form className={style.form} action='submit' onSubmit={handleSubmit(onClickSumbit)}>
          <Space direction='vertical'>
            {error && <ErrorMessage error={error} />}
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
                    {isEditing ? (
                      <DatePicker
                        picker='date'
                        showTime
                        style={errors.eventDate?.message ? { marginLeft: '15px' } : { marginLeft: 0 }}
                        onChange={(val) => onChange(moment(val).format(DateFormat.WITH_SECONDS_FORMAT))}
                        format={DateFormat.WITH_SECONDS_FORMAT}
                        onBlur={onBlur}
                        value={moment(value, DateFormat.WITH_SECONDS_FORMAT)}
                      />
                    ) : (
                      <DatePicker
                        picker='date'
                        showTime
                        style={errors.eventDate?.message ? { marginLeft: '15px' } : { marginLeft: 0 }}
                        onChange={(val) => onChange(moment(val).format(DateFormat.WITH_SECONDS_FORMAT))}
                        format={DateFormat.WITH_SECONDS_FORMAT}
                        onBlur={onBlur}
                        defaultValue={moment(value)}
                      />
                    )}
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
