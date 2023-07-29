import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseHistory, SubmitedResponse } from '../../types/question'


export interface ResponsesState {
  history: ResponseHistory
  currentQuestion: string
}

const initialState: ResponsesState = {
  history: [],
  currentQuestion: ''
}

export const questions = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    reset: () => initialState,
    pushResponse: (state, action: PayloadAction<SubmitedResponse>) => {
      state.history.push(action.payload)
    },
    setCurrentQuestion: (state, action: PayloadAction<string>) => {
      state.currentQuestion = action.payload
    }
  }
})

export const {
  reset,
  pushResponse,
  setCurrentQuestion
} = questions.actions

export default questions.reducer