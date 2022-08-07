import { Badge, Button, Calendar, Row, Spin } from 'antd';
import { EventForm } from 'components/Forms/EventForm';
import { Dictionary } from 'constatns/dictionary';
import { DateFormat } from 'constatns/formats';
import { RoutesPath } from 'constatns/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { EventPayloadType as EventFormType } from 'models/utilsTypes';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { selectAllEvents, selectEventsIsLoading } from 'store/slices/eventSlice/selectors';
import { fetchCreateEvent } from 'store/slices/eventSlice/thunk';
import { eventTypeBadgeColor } from 'utils/eventTypeColorPick';
import style from './EventCalendar.module.css';

export const EventCalendar: React.FC = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const isLoading = useAppSelector(selectEventsIsLoading);
  const events = useAppSelector(selectAllEvents);
  const dispatch = useAppDispatch();

  const dateCellRender = (value: Moment) => {
    const formatedDate = value.format(DateFormat.BASIC_FORMAT);
    const currentDayEvents = events?.filter(
      (ev) => moment(ev.eventDate).format(DateFormat.BASIC_FORMAT) === formatedDate,
    );
    return (
      <div>
        {currentDayEvents?.map((ev, index) => (
          <div key={ev._id}>
            <Badge
              status={eventTypeBadgeColor(ev.eventType)}
              text={
                <Link className={style.eventItem} to={`${RoutesPath.EVENTS}/${ev._id}`}>
                  {ev.title}
                </Link>
              }
            />
          </div>
        ))}
      </div>
    );
  };

  const onCancel = useCallback(() => {
    setModalVisibility(false);
  }, []);

  const onSubmit = useCallback(
    async (data: EventFormType) => {
      await dispatch(fetchCreateEvent(data));
      setModalVisibility(false);
    },
    [dispatch],
  );

  return (
    <div>
      <Spin spinning={isLoading} tip={Dictionary.LOADING}>
        <Calendar dateCellRender={dateCellRender} />
      </Spin>
      <Row justify='center'>
        <Button
          loading={isLoading}
          className={style.addEventBtn}
          type='default'
          size='large'
          onClick={() => setModalVisibility(true)}
        >
          Add Event
        </Button>
        <EventForm isEditing={false} isModalVisible={isModalVisible} onCancel={onCancel} onSubmit={onSubmit} />
      </Row>
    </div>
  );
};
