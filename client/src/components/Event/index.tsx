import { Typography } from 'antd';
import { TaskForm } from 'components/Forms/TaskForm';
import { TodoList } from 'components/TodoList';
import { eventType } from 'models/Event';
import { ITask, TaskFormType } from 'models/ITask';
import React, { useCallback, useState } from 'react';
import style from './Event.module.css';

//TODO: SHOULD FIX
type PropsType = {
  event: {
    _id: string;
    title: string;
    text: string;
    eventType: eventType;
    eventDate: string;
    tasks: ITask[];
  };
};

export const Event: React.FC<PropsType> = ({ event }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null | ITask>(null);
  const { text, title, _id, tasks } = event;

  const onCancel = useCallback(() => {
    setEditable(false);
    setModalVisibility(false);
  }, []);

  const onSubmit = useCallback(
    async (data: TaskFormType) => {
      console.log(`new text for task: ${JSON.stringify(data)} and eventId: ${_id}`);
      setModalVisibility(false);
    },
    [_id],
  );

  const onAddTask = useCallback(() => {
    setModalVisibility(true);
  }, []);

  const onEdit = useCallback((task: ITask) => {
    setSelectedTask(task);
    console.log(task);
    setEditable(true);
    setModalVisibility(true);
  }, []);

  const onEditSubmit = useCallback(
    (data: TaskFormType) => {
      console.log(`new text for task: ${JSON.stringify(data)}`);
      console.log(selectedTask?._id);
      setEditable(false);
      setModalVisibility(false);
    },
    [selectedTask?._id],
  );

  const onTaskToggle = useCallback((task: ITask) => {
    console.log('task complete toggled', task);
  }, []);

  const onTaskRemoval = useCallback((task: ITask) => {
    console.log('task removed', task);
  }, []);

  return (
    <div>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>
        {title}
      </Typography.Title>
      <Typography.Paragraph className={style.eventText}>{text}</Typography.Paragraph>
      <TodoList
        tasks={tasks}
        onTaskToggle={onTaskToggle}
        onTaskRemoval={onTaskRemoval}
        onAddTask={onAddTask}
        onEdit={onEdit}
      />
      {isEditable && selectedTask ? (
        <TaskForm
          isModalVisible={isModalVisible}
          onSubmit={onEditSubmit}
          onCancel={onCancel}
          text={selectedTask?.text}
        />
      ) : (
        <TaskForm isEditing={isEditable} isModalVisible={isModalVisible} onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </div>
  );
};
