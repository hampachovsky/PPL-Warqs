import { Button, Calendar, Row } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import { EventForm } from 'components/Forms/EventForm';
import { EventFormType } from 'models/Event';
import type { Moment } from 'moment';
import React, { useState } from 'react';
import style from './EventCalendar.module.css';

export const EventCalendar: React.FC = () => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const onCancel = () => {
    setModalVisibility(false);
  };

  //TODO: FIX ANY
  const onSubmit = (data: EventFormType) => {
    console.log(data);
    setModalVisibility(false);
  };

  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format(), mode);
  };

  return (
    <div>
      <Calendar onPanelChange={onPanelChange} />
      <Row justify='center'>
        <Button className={style.addEventBtn} type='default' size='large' onClick={() => setModalVisibility(true)}>
          Add Event
        </Button>
        <EventForm isEditing={false} isModalVisible={isModalVisible} onCancel={onCancel} onSubmit={onSubmit} />
      </Row>
    </div>
  );
};
