import { Button, Col, List, Row, Typography } from 'antd';
import { TodoItem } from 'components/TodoItem';
import { ITask } from 'models/ITask';
import React from 'react';
import style from './TodoList.module.css';

type PropsType = {
  tasks: ITask[];
  onTaskToggle: (task: ITask) => void;
  onTaskRemoval: (task: ITask) => void;
  onAddTask: () => void;
  onEdit: (task: ITask) => void;
};

export const TodoList: React.FC<PropsType> = ({ tasks, onTaskToggle, onTaskRemoval, onAddTask, onEdit }) => {
  return (
    <Row justify='center' style={{ marginTop: '3.5em' }}>
      <Col span={24}>
        <Typography.Title style={{ textAlign: 'center' }} level={2}>
          Todo list for this event:
        </Typography.Title>
      </Col>
      <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginBottom: '3.5em', marginTop: '0.5em' }}>
        <Button type='primary' size='large' className={style.addTodoBtn} onClick={onAddTask}>
          Add todo
        </Button>
      </Col>
      <Col span={24}>
        <List
          locale={{
            emptyText: "There's nothing to do :(",
          }}
          dataSource={tasks}
          renderItem={(task) => (
            <TodoItem task={task} onTaskToggle={onTaskToggle} onTaskRemoval={onTaskRemoval} onEdit={onEdit} />
          )}
        />
      </Col>
    </Row>
  );
};
