import { EventCalendar } from 'components/EventCalendar';
import { useAppDispatch } from 'hooks/redux';
import React, { useEffect } from 'react';
import { fetchEvents } from 'store/slices/eventSlice/thunk';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      <EventCalendar />
    </>
  );
};
