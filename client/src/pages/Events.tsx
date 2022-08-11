import { notification, Typography } from 'antd';
import { EventList } from 'components/EventList';
import { Dictionary } from 'constatns/dictionary';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseEventsSearchParams } from 'store/slices/eventSlice/eventSlice';
import { selectEventsFilters } from 'store/slices/eventSlice/selectors';
import { fetchEventsBy } from 'store/slices/eventSlice/thunk';

export const Events: React.FC = () => {
  const { date, queryString, type } = useAppSelector(selectEventsFilters);
  const error = useAppSelector((state) => state.eventReducer.error);
  const [isSearchParamsParsed, setIsSearchParamsParsed] = useState(false);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(parseEventsSearchParams(Array.from(searchParams.entries())));
    setIsSearchParamsParsed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isSearchParamsParsed) dispatch(fetchEventsBy({ date, queryString, type }));
  }, [date, queryString, type, dispatch, isSearchParamsParsed]);

  if (error) notification.error({ placement: 'topRight', duration: 3, message: error });

  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        {Dictionary.EVENTS_LIST_TITLE}
      </Typography.Title>
      <EventList />
    </>
  );
};
