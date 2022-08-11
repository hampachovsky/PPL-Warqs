import { Result } from 'antd';
import { Button } from 'antd/lib/radio';
import { Event } from 'components/Event';
import { Preloader } from 'components/Preloader';
import { RoutesPath } from 'constatns/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { selectEventById, selectEventsIsLoading } from 'store/slices/eventSlice/selectors';
import {
  selectAllTasks,
  selectTasksIsError,
  selectTasksIsLoading,
  selectTasksIsSuccess,
} from 'store/slices/taskSlice/selectors';
import { fetchTasks } from 'store/slices/taskSlice/thunk';

export const EventPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => selectEventById(state, id!));
  const navigate = useNavigate();
  const tasks = useAppSelector(selectAllTasks);
  const isEventLoading = useAppSelector(selectEventsIsLoading);
  const isTaskLoading = useAppSelector(selectTasksIsLoading);
  const isError = useAppSelector(selectTasksIsError);

  useEffect(() => {
    dispatch(fetchTasks(event?._id!));
  }, [dispatch, event?._id]);

  if (isEventLoading) return <Preloader />;
  if (isError)
    return (
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={() => navigate(RoutesPath.HOME, { replace: true })}>
            Back Home
          </Button>
        }
      />
    );

  return (
    <>
      <Event event={event!} tasks={tasks} />
    </>
  );
};
