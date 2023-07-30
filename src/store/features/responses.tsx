import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseHistory, SubmitedResponse, Question } from '../../types/question'
import computeNextQuestion, { getQuestionFromId } from '../../utils/logic/compute_next_question'


export interface ResponsesState {
  history: ResponseHistory
  currentQuestion: string,
  questions: Question []
}

const initialState: ResponsesState = {
  history: [],
  currentQuestion: 'experience',
  questions: []
}

export const questions = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    reset: () => initialState,
    saveQuestions: (state: ResponsesState, action: PayloadAction<Question []>) => {
      state.questions = action.payload
    },
    goToNextQuestion: (state: ResponsesState, action: PayloadAction<string []>) => {
      const currentQuestion = getQuestionFromId(state.currentQuestion, state.questions)

      state.history.push({
        ids: action.payload,
        questionId: state.currentQuestion
      })
      state.currentQuestion = computeNextQuestion(
        state.history,
        currentQuestion,
        state.questions
      )
    }
  }
})

export const {
  reset,
  saveQuestions,
  goToNextQuestion
} = questions.actions

export default questions.reducer