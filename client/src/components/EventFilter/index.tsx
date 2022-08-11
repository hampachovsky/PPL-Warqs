import { Button, Input, Radio, Row, Space } from 'antd';
import { Dictionary } from 'constatns/dictionary';
import { useAppSelector } from 'hooks/redux';
import { useDateFilter } from 'hooks/useDateFilter';
import { useQueryStringFilter } from 'hooks/useQueryStringFilter';
import { useTypeFilter } from 'hooks/useTypeFilter';
import { eventType } from 'models/Event';
import React, { useMemo, useState } from 'react';
import { selectEventsFilters } from 'store/slices/eventSlice/selectors';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';
import style from './EventFilter.module.css';

export const EventFilter: React.FC = () => {
  const { date, queryString, type } = useAppSelector(selectEventsFilters);
  const [searchString, setSearchString] = useState(queryString);
  const [filterType, setFilterType] = useState(type);
  const [filterDate, setFilterDate] = useState(date);

  const { handleSearchSubmit } = useQueryStringFilter(searchString);
  const { handleDateChange } = useDateFilter();
  const { handleTypeChange } = useTypeFilter();

  useMemo(() => {
    setFilterDate(date);
    setFilterType(type);
    setSearchString(queryString);
  }, [date, type, queryString]);

  return (
    <div>
      <Row justify='center'>
        <Space align='center' direction='vertical' size={24}>
          <Input.Search
            placeholder='input search text'
            className={style.searchInput}
            value={searchString}
            onChange={(evt) => setSearchString(evt.target.value)}
            enterButton={
              <Button
                shape='round'
                type='primary'
                style={{ backgroundColor: '#001529' }}
                onClick={handleSearchSubmit}
                className={style.searchBtn}
              >
                {Dictionary.SEARCH}
              </Button>
            }
            size='large'
          />
          <Radio.Group value={filterDate} buttonStyle='solid' onChange={handleDateChange}>
            <Radio.Button className={style.filterBtn} value='earliest'>
              {Dictionary.EARLIEST}
            </Radio.Button>
            <Radio.Button className={style.filterBtn} value='newest'>
              {Dictionary.NEWEST}
            </Radio.Button>
          </Radio.Group>
          <Radio.Group buttonStyle='solid' value={filterType} onChange={handleTypeChange}>
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
