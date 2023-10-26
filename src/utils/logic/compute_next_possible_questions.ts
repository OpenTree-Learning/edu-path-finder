import { ResponseHistory , Question } from 'types/question'
import { getQuestionFromId } from './get_question'
import computeNextQuestion from './compute_next_question'



export function computeNextPossibleQuestions(
  currentQuestionId: string,
  currentResponsesIds: string [],
  history: ResponseHistory,
  questions: Question [],
): Question [] {

  let nextQuestions: Question [] = []

  let currentQuestion: Question = getQuestionFromId(currentQuestionId, questions)
  let nextQuestionId: string = ''

  while (
    currentQuestion &&
    currentQuestion.nextQuestions &&
    currentQuestion.nextQuestions.length > 0
  ) {

    if (!history.find((response, idx) => response.questionId === currentQuestionId)) {
      history.push({
        questionId: currentQuestionId,
        ids: currentResponsesIds
      })
    }

    nextQuestionId = computeNextQuestion(currentQuestion, history, questions)
    currentQuestion = getQuestionFromId(nextQuestionId, questions)
    nextQuestions.push(currentQuestion)

  }

  return nextQuestions
}