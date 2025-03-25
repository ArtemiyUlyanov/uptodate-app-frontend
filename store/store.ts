import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthSliceType } from "./features/auth/authSlice";
import historyReducer, { HistorySliceType } from "./features/history/historySlice";
import { persistReducer, persistStore, WebStorage } from 'redux-persist';
import languageReducer, { LanguageSliceType } from "./features/language/languageSlice";

const storage: WebStorage = {
  getItem: (key) => Promise.resolve((typeof window !== 'undefined' && localStorage.getItem(key)) || null),
  setItem: (key, value) => Promise.resolve(typeof window !== 'undefined' ? localStorage.setItem(key, value) : undefined),
  removeItem: (key) => Promise.resolve(typeof window !== 'undefined' ? localStorage.removeItem(key) : undefined),
};

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
    reducer: {
      auth: persistReducer<AuthSliceType>(persistConfig, authReducer),
      history: persistReducer<HistorySliceType>(persistConfig, historyReducer),
      language: persistReducer<LanguageSliceType>(persistConfig, languageReducer)
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;