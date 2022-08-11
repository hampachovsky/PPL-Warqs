import { clearUserError } from 'store/slices/userSlice/userSlice';
import { useAppDispatch } from './redux';

export const useClearUserError = () => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearUserError());
  };

  return { handleClear };
};
