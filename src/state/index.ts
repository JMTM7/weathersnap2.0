import { load, save } from 'redux-localstorage-simple';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { updateVersion } from './global/actions';
import userReducer from './user/reducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const PERSISTED_KEYS = ['user'];

const preloadedState = load({
  states: PERSISTED_KEYS,
  disableWarnings: process.env.NODE_ENV === 'test',
});

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(
      save({ states: PERSISTED_KEYS, debounce: 1000 })
    ),
});

store.dispatch(updateVersion());

setupListeners(store.dispatch);

export default store;

export const selectAppState = () => store.getState();
export const appDispatch = store.dispatch;
