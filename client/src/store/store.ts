import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import eventReducer from './slices/eventSlice/eventSlice';
import taskReducer from './slices/taskSlice/taskSlice';

const rootReducer = combineReducers({
  userReducer,
  eventReducer,
  taskReducer,
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
