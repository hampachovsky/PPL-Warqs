import { Typography } from 'antd';
import { EventList } from 'components/EventList';
import React from 'react';

export const Events: React.FC = () => {
  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        Events list
      </Typography.Title>
      <EventList />
    </>
  );
};
