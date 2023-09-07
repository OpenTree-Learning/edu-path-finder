import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResponseHistory, SubmitedResponse, Question, NextQuestion } from '../../types/question'
import computeNextQuestion, { getQuestionFromId } from '../../utils/logic/compute_next_question'
import { ACTION_PREFETCH } from 'next/dist/client/components/router-reducer/router-reducer-types'


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
      const { questionId } = action.payload

      if (state.history.find((r: SubmitedResponse) => r.questionId === questionId)) {
        return
      }

      const currentQuestion = getQuestionFromId(state.currentQuestion, state.questions)
      const isLastQuestion = currentQuestion.nextQuestions.length === 0
        || currentQuestion.nextQuestions.every((nextQuestion: NextQuestion) => 
            Object.keys(nextQuestion).length === 0)
      let nextQuestion = 'end'

      console.log('NEXT QUESTIONS:', JSON.stringify(currentQuestion.nextQuestions))
      console.log(`IS LAST QUESTION: ${isLastQuestion}`)

      if (!isLastQuestion) {
        state.history.push({
          ids: action.payload.ids,
          questionId: state.currentQuestion
        })
        nextQuestion = computeNextQuestion(
          state.history,
          currentQuestion,
          state.questions
        )
        console.log({nextQuestion})
        console.log('\n\n')
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