import { Badge, Button, Calendar, Row, Spin } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import { EventForm } from 'components/Forms/EventForm';
import { useAppSelector } from 'hooks/redux';
import { EventFormType } from 'models/Event';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutesPath } from 'constatns/routes';
import { selectEventsIsLoading } from 'store/slices/eventSlice/selectors';
import { eventTypeBadgeColor } from 'utils/eventTypeColorPick';
import style from './EventCalendar.module.css';
import { Dictionary } from 'constatns/dictionary';

export const EventCalendar: React.FC = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const isLoading = useAppSelector(selectEventsIsLoading);
  const events = useAppSelector((state) => state.eventReducer.events);

  function dateCellRender(value: Moment) {
    const formatedDate = value.format('YYYY-MM-DD');
    const currentDayEvents = events?.filter((ev) => moment(ev.eventDate).format('YYYY-MM-DD') === formatedDate);
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
  }

  const onCancel = () => {
    setModalVisibility(false);
  };

  //TODO: Usecallback
  const onSubmit = (data: EventFormType) => {
    console.log(data);
    setModalVisibility(false);
  };

  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format(), mode);
  };

  return (
    <div>
      <Spin spinning={isLoading} tip={Dictionary.LOADING}>
        <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
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
