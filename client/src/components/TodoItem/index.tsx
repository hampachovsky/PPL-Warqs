import { CheckOutlined, CloseOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Col, List, Popconfirm, Row, Switch, Tag, Tooltip, Typography } from 'antd';
import { ITask } from 'models/ITask';
import style from './TodoItem.module.css';
import React from 'react';
import { Dictionary } from 'constatns/dictionary';

type PropsType = {
  task: ITask;
  onTaskToggle: (task: ITask) => void;
  onTaskRemoval: (task: ITask) => void;
  onEdit: (task: ITask) => void;
};

export const TodoItem: React.FC<PropsType> = ({ task, onTaskRemoval, onTaskToggle, onEdit }) => {
  return (
    <List.Item
      actions={[
        <Tooltip title={task.completed ? Dictionary.MARK_AS_UNCOMPLETED : Dictionary.MARK_AS_COMPLETED}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTaskToggle(task)}
            defaultChecked={task.completed}
          />
        </Tooltip>,
        <Tooltip title={Dictionary.EDIT_TASK}>
          <Button type='primary' onClick={() => onEdit(task)}>
            <ToolOutlined />
          </Button>
        </Tooltip>,
        <Popconfirm
          title='Are you sure you want to delete?'
          onConfirm={() => {
            onTaskRemoval(task);
          }}
        >
          <Button type='primary' danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      key={task._id}
    >
      <Row>
        <Col span={12}>
          <Typography.Title level={5} className={task.completed ? style.completedTask : style.task}>
            {task.text}
          </Typography.Title>
        </Col>
        <Col span={5} offset={3}>
          <Tag color={task.completed ? 'cyan' : 'red'}>{task.completed ? 'completed' : 'incomplete'}</Tag>
        </Col>
      </Row>
    </List.Item>
  );
};
