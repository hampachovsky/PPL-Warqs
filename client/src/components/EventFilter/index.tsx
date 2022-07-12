import { Button, Input, Radio, Row, Space } from 'antd';
import { eventType } from 'models/Event';
import React from 'react';
import style from './EventFilter.module.css';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

export const EventFilter: React.FC = () => {
  return (
    <div>
      <Row justify='center'>
        <Space align='center' direction='vertical' size={24}>
          <Input.Search
            placeholder='input search text'
            className={style.searchInput}
            enterButton={
              <Button shape='round' type='primary' style={{ backgroundColor: '#001529' }} className={style.searchBtn}>
                Search
              </Button>
            }
            size='large'
          />
          <Radio.Group defaultValue='newest' buttonStyle='solid'>
            <Radio.Button className={style.filterBtn} value='earliest'>
              Earliest
            </Radio.Button>
            <Radio.Button className={style.filterBtn} value='newset'>
              Newest
            </Radio.Button>
          </Radio.Group>
          <Radio.Group buttonStyle='solid'>
            <Radio.Button className={style.filterBtn} value={eventType.minor}>
              {capitalizeFirstLetter(eventType.minor)}
            </Radio.Button>
            <Radio.Button className={style.filterBtn} value={eventType.warning}>
              {capitalizeFirstLetter(eventType.warning)}
            </Radio.Button>
            <Radio.Button className={style.filterBtn} value={eventType.important}>
              {capitalizeFirstLetter(eventType.important)}
            </Radio.Button>
          </Radio.Group>
        </Space>
      </Row>
    </div>
  );
};
