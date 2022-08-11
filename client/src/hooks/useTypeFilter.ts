import { RadioChangeEvent } from 'antd';
import { FiltersConstants } from 'constatns/filtersConstants';
import { useSearchParams } from 'react-router-dom';
import { changeEventFilterType } from 'store/slices/eventSlice/eventSlice';
import { useAppDispatch } from './redux';

export const useTypeFilter = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTypeChange = (evt: RadioChangeEvent) => {
    searchParams.delete(FiltersConstants.TYPE);
    searchParams.append(FiltersConstants.TYPE, evt.target.value);
    setSearchParams(searchParams);
    dispatch(changeEventFilterType(evt.target.value));
  };

  return { handleTypeChange };
};
