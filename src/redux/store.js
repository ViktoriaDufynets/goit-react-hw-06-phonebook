import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persisteContactReducer } from './reducer';

export const store = configureStore({
  reducer: {
    contacts: persisteContactReducer,
  },

  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);