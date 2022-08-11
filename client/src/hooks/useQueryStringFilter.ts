import { FiltersConstants } from 'constatns/filtersConstants';
import { useSearchParams } from 'react-router-dom';
import { changeEventFilterQueryString } from 'store/slices/eventSlice/eventSlice';
import { useAppDispatch, useAppSelector } from './redux';

export const useQueryStringFilter = (searchString: string) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = useAppSelector((state) => state.eventReducer.filters.queryString);

  const handleSearchSubmit = () => {
    if (searchString !== queryString) {
      searchParams.delete(FiltersConstants.QUERY_STRING);
      searchString && searchParams.append(FiltersConstants.QUERY_STRING, searchString);
      setSearchParams(searchParams);
      dispatch(changeEventFilterQueryString(searchString));
    }
  };

  return { handleSearchSubmit };
};
