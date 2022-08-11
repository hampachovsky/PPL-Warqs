import { RadioChangeEvent } from 'antd';
import { FiltersConstants } from 'constatns/filtersConstants';
import { useSearchParams } from 'react-router-dom';
import { changeEventFilterDate } from 'store/slices/eventSlice/eventSlice';
import { useAppDispatch } from './redux';

export const useDateFilter = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDateChange = (evt: RadioChangeEvent) => {
    searchParams.delete(FiltersConstants.DATE);
    searchParams.append(FiltersConstants.DATE, evt.target.value);
    setSearchParams(searchParams);
    dispatch(changeEventFilterDate(evt.target.value));
  };

  return { handleDateChange };
};
