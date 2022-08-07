import { Event } from 'components/Event';
import { eventType } from 'models/Event';
import { ITask } from 'models/ITask';
import moment from 'moment';
import React from 'react';

type TESTTYPE = {
  _id: string;
  title: string;
  text: string;
  eventType: eventType;
  eventDate: string;
  tasks: ITask[];
};

export const EventPage: React.FC = () => {
  const event: TESTTYPE = {
    _id: '62c45cc592e3e723d7996a00',
    title: 'woooooooow',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestias laborum vel tempore tempora ullam.',
    eventType: eventType.minor,
    eventDate: moment('2022-07-02T13:14:34.000+00:00').format('YYYY-MM-DD'),
    tasks: [
      {
        _id: '62c45de94afd1ffde6ef9943',
        text: 'firstTask',
        completed: true,
      },
      {
        _id: '62c45de94afd1ffde6ef9942',
        text: 'second task',
        completed: false,
      },
      {
        _id: '62c45de94afd1ffde6ef9941',
        text: 'tewtrewqqwr ',
        completed: false,
      },
      {
        _id: '62c45de94afd1ffde6ef9945',
        text: 'firstTask',
        completed: true,
      },
      {
        _id: '62c45de94afd1ffde6ef9946',
        text: 'second task',
        completed: false,
      },
      {
        _id: '62c45de94afd1ffde6ef9947',
        text: 'tewtrewqqwr ',
        completed: false,
      },
    ],
  };
  return (
    <>
      <Event event={event} />
    </>
  );
};
