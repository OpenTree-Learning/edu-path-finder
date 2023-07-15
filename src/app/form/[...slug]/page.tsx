import { getQuestions } from '../../../utils/questions'
import Question from './question'
import * as types from '../../../types/question'


export async function preloadQuestions () {
  void await getQuestions()
}

export default async function QuestionPage({ params }: { params: { slug: string } }) {

  const [ questionId ] = params.slug
  const questions: types.QuestionResponse = await getQuestions()
  const question: types.default = questions.data
    .find((q: types.default) => q.id === questionId) as types.default

  if (!question) {
    throw new Error(`No question ${questionId}`)
  }

  return (
    <Question question={question}/>
  )
}
