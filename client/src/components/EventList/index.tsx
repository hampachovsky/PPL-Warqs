import { Button, Space, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/lib/table';
import { EventFilter } from 'components/EventFilter';
import { DateFormat } from 'constatns/formats';
import { useAppSelector } from 'hooks/redux';
import { EventListDataType } from 'models/Event';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { eventTypeTagColor } from 'utils/eventTypeColorPick';

const columns: ColumnsType<EventListDataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 150,
    render: (_, record) => (
      <Link key={record._id} to={`/events/${record._id}`}>
        {record.title}
      </Link>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'eventDate',
    key: 'eventDate',
    width: 150,
    render: (_, record) => (
      <>
        <Typography.Text key={record._id}>
          {moment(record.eventDate).format(DateFormat.WITH_MINUTES_FORMAT)}
        </Typography.Text>
      </>
    ),
  },
  {
    title: 'eventType',
    key: 'eventType',
    dataIndex: 'eventType',
    width: 100,
    render: (_, record) => (
      <>
        <Tag key={record._id} color={eventTypeTagColor(record.eventType)}>
          {record.eventType}
        </Tag>
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: 50,
    render: (_, record) => (
      <Space size='middle'>
        <Button type='link'>Edit</Button>
        <Button type='link'>Delete</Button>
      </Space>
    ),
  },
];

export const EventList: React.FC = () => {
  const events = useAppSelector((state) => state.eventReducer.events);
  return (
    <>
      <EventFilter />
      <Table
        style={{ marginTop: '1.5rem' }}
        scroll={{
          x: 100,
        }}
        columns={columns}
        rowKey={(record) => record._id}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <p style={{ margin: 0 }}>{record.text}</p>
            </>
          ),
        }}
        dataSource={events!}
      />
    </>
  );
};
