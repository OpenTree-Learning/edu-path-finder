import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseHistory, SubmitedResponse, Question, NextQuestion } from '../../types/question'
import computeNextQuestion, { getQuestionFromId } from '../../utils/logic/compute_next_question'
import { ACTION_PREFETCH } from 'next/dist/client/components/router-reducer/router-reducer-types'



const DEFAULT_NEXT_QUESTION = 'end'

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
    goToNextQuestion: (state: ResponsesState, action: PayloadAction<SubmitedResponse>) => {
      const { questionId, ids } = action.payload
      const { history, questions } = state

      if (history.find((r: SubmitedResponse) => r.questionId === questionId)) {
        return
      }

      const currentQuestion = getQuestionFromId(state.currentQuestion, questions)
      const isLastQuestion = currentQuestion && currentQuestion.nextQuestions 
        && currentQuestion.nextQuestions.length === 0

      let nextQuestion = DEFAULT_NEXT_QUESTION

      if (!isLastQuestion) {
        history.push({
          ids: action.payload.ids,
          questionId: state.currentQuestion
        })
        nextQuestion = computeNextQuestion(history, currentQuestion, questions) || DEFAULT_NEXT_QUESTION
      }

      state.currentQuestion = nextQuestion
    }
  }
})

export const {
  reset,
  saveQuestions,
  goToNextQuestion
} = questions.actions

export default questions.reducer