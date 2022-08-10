import { Event } from 'components/Event';
import { Preloader } from 'components/Preloader';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectEventById, selectEventsIsLoading } from 'store/slices/eventSlice/selectors';
import { selectAllTasks } from 'store/slices/taskSlice/selectors';
import { fetchTasks } from 'store/slices/taskSlice/thunk';

export const EventPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => selectEventById(state, id!));
  const tasks = useAppSelector(selectAllTasks);
  const isLoading = useAppSelector(selectEventsIsLoading);

  useEffect(() => {
    dispatch(fetchTasks(event?._id!));
  }, [dispatch, event?._id]);

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <Event event={event!} tasks={tasks} />
    </>
  );
};
