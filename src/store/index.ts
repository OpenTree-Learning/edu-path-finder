import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './features/responses'
import iconsReducer from './features/icons'


const persistedQuestionsReducer = persistReducer({
  key: 'questions',
  storage
}, questionsReducer)

const persistedIconsReducer = persistReducer({
  key: 'icons',
  storage
}, iconsReducer)

export const store = configureStore({
  reducer: {
    persistedQuestionsReducer,
    persistedIconsReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch