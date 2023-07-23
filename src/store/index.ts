import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './features/responses'


export const store = configureStore({
  reducer: {
    questionsReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
