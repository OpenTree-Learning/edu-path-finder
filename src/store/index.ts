import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './features/responses'



const persistedQuestionsReducer = persistReducer({
  key: 'questions',
  storage
}, questionsReducer)

export const store = configureStore({
  reducer: {
    persistedQuestionsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch