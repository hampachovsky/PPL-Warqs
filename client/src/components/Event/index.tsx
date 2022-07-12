import { Typography } from 'antd';
import { TaskForm } from 'components/Forms/TaskForm';
import { TodoList } from 'components/TodoList';
import { IEvent } from 'models/Event';
import { ITask, TaskFormType } from 'models/ITask';
import React, { useState } from 'react';
import style from './Event.module.css';

type PropsType = {
  event: IEvent;
};

export const Event: React.FC<PropsType> = ({ event }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null | ITask>(null);
  const { text, title, _id, tasks } = event;

  const onCancel = () => {
    setEditable(false);
    setModalVisibility(false);
  };

  const onSubmit = (data: TaskFormType) => {
    console.log(`new text for task: ${JSON.stringify(data)} and eventId: ${_id}`);
    setModalVisibility(false);
  };

  const onAddTask = () => {
    setModalVisibility(true);
  };

  const onEdit = (task: ITask) => {
    setSelectedTask(task);
    console.log(task);
    setEditable(true);
    setModalVisibility(true);
  };

  const onEditSubmit = (data: TaskFormType) => {
    console.log(`new text for task: ${JSON.stringify(data)}`);
    console.log(selectedTask?._id);
    setEditable(false);
    setModalVisibility(false);
  };

  const onTaskToggle = (task: ITask) => {
    console.log('task complete toggled', task);
  };

  const onTaskRemoval = (task: ITask) => {
    console.log('task removed', task);
  };
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
