import { Spin, Typography } from 'antd';
import { TaskForm } from 'components/Forms/TaskForm';
import { TodoList } from 'components/TodoList';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { eventType } from 'models/Event';
import { ITask, TaskFormType } from 'models/ITask';
import React, { useCallback, useState } from 'react';
import { selectTasksIsLoading } from 'store/slices/taskSlice/selectors';
import { fetchCreateTask, fetchDeleteTask, fetchUpdateTask } from 'store/slices/taskSlice/thunk';
import style from './Event.module.css';

//TODO: SHOULD FIX
type PropsType = {
  event: {
    _id: string;
    title: string;
    text: string;
    eventType: eventType;
    eventDate: string;
  };
  tasks: ITask[];
};

export const Event: React.FC<PropsType> = ({ event, tasks }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null | ITask>(null);
  const isLoading = useAppSelector(selectTasksIsLoading);
  const dispatch = useAppDispatch();

  const { text, title, _id } = event;

  const onCancel = useCallback(() => {
    setEditable(false);
    setModalVisibility(false);
  }, []);

  const onSubmit = useCallback(
    async (data: TaskFormType) => {
      dispatch(fetchCreateTask({ ...data, eventId: _id }));
      setModalVisibility(false);
    },
    [_id, dispatch],
  );

  const onAddTask = useCallback(() => {
    setModalVisibility(true);
  }, []);

  const onEdit = useCallback((task: ITask) => {
    setSelectedTask(task);
    setEditable(true);
    setModalVisibility(true);
  }, []);

  const onEditSubmit = useCallback(
    (data: TaskFormType) => {
      const payload = { ...selectedTask!, text: data.text };
      dispatch(fetchUpdateTask(payload));

      setEditable(false);
      setModalVisibility(false);
    },
    [selectedTask, dispatch],
  );

  const onTaskToggle = useCallback(
    (task: ITask) => {
      const payload: ITask = { ...task, completed: !task.completed };
      dispatch(fetchUpdateTask(payload));
    },
    [dispatch],
  );

  const onTaskRemoval = useCallback(
    (task: ITask) => {
      dispatch(fetchDeleteTask(task._id));
    },
    [dispatch],
  );

  return (
    <div>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        {title}
      </Typography.Title>
      <Typography.Paragraph className={style.eventText}>{text}</Typography.Paragraph>
      <Spin spinning={isLoading}>
        <TodoList
          tasks={tasks}
          onTaskToggle={onTaskToggle}
          onTaskRemoval={onTaskRemoval}
          onAddTask={onAddTask}
          onEdit={onEdit}
        />
      </Spin>
      {isEditable && selectedTask ? (
        <TaskForm
          isEditing={isEditable}
          isModalVisible={isModalVisible}
          onSubmit={onEditSubmit}
          onCancel={onCancel}
          text={selectedTask?.text}
        />
      ) : (
        <TaskForm isModalVisible={isModalVisible} onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </div>
  );
};
