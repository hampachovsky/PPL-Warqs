import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import eventReducer from './slices/eventSlice/eventSlice';

const rootReducer = combineReducers({
  userReducer,
  eventReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
