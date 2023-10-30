import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseHistory, SubmitedResponse, Question, NextQuestion } from '../../types/question'
import { getQuestionFromId } from 'utils/logic/get_question'
import { computeNextPossibleQuestions } from 'utils/logic/compute_next_possible_questions'



export const DEFAULT_NEXT_QUESTION = 'end'

export interface ResponsesState {
  history: ResponseHistory
  currentQuestion: string,
  questions: Question [],
  nextPossibleQuestions: Question []
}

const initialState: ResponsesState = {
  history: [],
  currentQuestion: 'experience',
  questions: [],
  nextPossibleQuestions: []
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

        state.nextPossibleQuestions = computeNextPossibleQuestions(
          state.currentQuestion,
          ids,
          history,
          questions
        )

        if (state.nextPossibleQuestions.length) {
          nextQuestion = state.nextPossibleQuestions[0].questionId
        }

        history.push({
          ids: action.payload.ids,
          questionId: state.currentQuestion
        })

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