import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseHistory, SubmitedResponse } from '../../types/question'


interface ResponsesState {
  history: ResponseHistory
}

const initialState: ResponsesState = {
  history: []
}

export const questions = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    reset: () => initialState,
    pushResponse: (state, action: PayloadAction<SubmitedResponse>) => {
      state.history.push(action.payload)
    }
  }
})

export const {
  reset,
  pushResponse
} = questions.actions

export default questions.reducer