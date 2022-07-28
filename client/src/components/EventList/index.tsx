import { Button, Space, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/lib/table';
import { EventFilter } from 'components/EventFilter';
import { EventListDataType, eventType } from 'models/Event';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { eventTypeTagColor } from 'utils/eventTypeColorPick';

const columns: ColumnsType<EventListDataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 100,
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
    width: 100,
    render: (_, record) => (
      <>
        <Typography.Text key={record._id}>{record.eventDate}</Typography.Text>
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
    width: 250,
    render: (_, record) => (
      <Space size='middle'>
        <Button type='link'>Edit {record.title}</Button>
        <Button type='link'>Delete</Button>
      </Space>
    ),
  },
];

export const EventList: React.FC = () => {
  const data: EventListDataType[] = [
    {
      _id: '1',
      title: 'Some shit',
      text: 'realy shit',
      eventType: eventType.minor,
      eventDate: moment().format('YYYY-MM-DD'),
    },
    {
      _id: '2',
      title: 'Jim Green',
      text: 'blablwwwwwwwwwwwwwwwabla',
      eventType: eventType.warning,
      eventDate: moment('2022-07-11').format('YYYY-MM-DD'),
    },
    {
      _id: '3',
      title: 'Joe Black',
      text: 'new text',
      eventType: eventType.important,
      eventDate: moment('2022-07-10').format('YYYY-MM-DD'),
    },
  ];
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
        dataSource={data}
      />
    </>
  );
};
