import { Button, Space, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/lib/table';
import { EventFilter } from 'components/EventFilter';
import { EventForm } from 'components/Forms/EventForm';
import { DateFormat } from 'constatns/formats';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IEvent } from 'models/Event';
import { EventPayloadType as EventFormType } from 'models/utilsTypes';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { selectAllEvents, selectEventsIsLoading } from 'store/slices/eventSlice/selectors';
import { fetchDeleteEvent, fetchUpdateEvent } from 'store/slices/eventSlice/thunk';
import { eventTypeTagColor } from 'utils/eventTypeColorPick';

export const EventList: React.FC = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [event, setSelectedEvent] = useState<IEvent | null>(null);
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsIsLoading);

  const columns: ColumnsType<IEvent> = [
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
      title: 'Event type',
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
          <Button type='link' onClick={() => onEditClick(record)}>
            Edit
          </Button>
          <Button type='link' onClick={() => onDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onEditClick = (event: IEvent) => {
    setSelectedEvent(event);
    setModalVisibility(true);
  };

  const onDelete = async (_id: string) => {
    await dispatch(fetchDeleteEvent(_id));
  };

  const onCancel = useCallback(() => {
    setModalVisibility(false);
  }, []);

  const onSubmit = useCallback(
    async (data: EventFormType) => {
      const payload: IEvent = {
        ...data,
        _id: event?._id!,
      };
      await dispatch(fetchUpdateEvent(payload));
      setModalVisibility(false);
    },
    [dispatch, event?._id],
  );

  return (
    <>
      <EventFilter />
      <Table
        loading={isLoading}
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
      <EventForm
        isEditing={true}
        isModalVisible={isModalVisible}
        onCancel={onCancel}
        onSubmit={onSubmit}
        event={event}
      />
    </>
  );
};
