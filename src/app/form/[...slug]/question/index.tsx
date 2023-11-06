'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { isStringInputType, isNumericalInputType, isArrayInputType, SubmitedResponse } from '../../../../types/question'
import { Question as QuestionType } from '../../../../types/question'
import QuestionInput from './question-input'
import { Form, Formik } from 'formik'

import { goToNextQuestion, saveQuestions, reset } from '../../../../store/features/responses'
import { useAppDispatch, useAppSelector  } from '../../../../store/hooks'
import EndPage from '../end'

import styles from './index.module.scss'

//
//
// TODO: Create a component for each inputType field value.
//
// TODO: Load the matching component when next question is loaded.
//
// TODO: Store in the cache the question answer into an history.
//
// TODO: Write a function that takes as input two parameters:
//       - the JSON of the question containing the logic.
//       - the history of questions with their answers 
//         so that the form customize itself for the student.
//
//


export interface QuestionProps {
  question: QuestionType,
  loadedQuestions: QuestionType []
}

export default function Question(
  { question, loadedQuestions }: QuestionProps
) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleRestart = () => {
    dispatch(reset())
    router.push('/')
  }

  if (!question) {
    return (
      <EndPage>
        <h2>End of the form!</h2>
        <h3>Thanks for answering all the question!</h3>
        <h3>We're working on building your best learning path!</h3>
      </EndPage>
    )
  }

  const { questionId, text, inputType, inputProps, responses, nextQuestions } = question
  const initialValueMap = [
    [isStringInputType(inputType), inputProps?.defaultValue || (responses && responses.length > 0 ? responses[0]?.id : '')],
    [isNumericalInputType(inputType), inputProps?.defaultValue || inputProps?.min || 0],
    [isArrayInputType(inputType), inputProps?.defaultValues || (responses && responses.length > 0 ? responses[0]?.id : '')]
  ]
  const initialValue = initialValueMap.find((value: any []) => value[0]) as any []
  const initialValues = { response: initialValue[1] }

  const currentQuestion = useAppSelector((state: any) => state.persistedQuestionsReducer.currentQuestion)
  const questions = useAppSelector((state: any) => state.persistedQuestionsReducer.questions)

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(saveQuestions(loadedQuestions))
    }
  }, [dispatch])


  useEffect(() => {
    router.push(currentQuestion)
  }, [currentQuestion])


  function handleQuestionSubmit (response: SubmitedResponse) {
    dispatch(goToNextQuestion(response))
  }

  return (
    <div className={styles.question} id={ `question_${questionId}` }>
      <h3 className='h3'>{ text }</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleQuestionSubmit(values.response)}
      >
        <Form className='form-default'>
          <QuestionInput question={question}/>
        </Form>
      </Formik>
    </div>
  )
}
