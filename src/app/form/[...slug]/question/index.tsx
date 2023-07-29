'use client'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Question } from '../../../../types/question'
import QuestionInput from './question-input'
import { Form, Formik } from 'formik'

import { pushResponse, setCurrentQuestion } from '../../../../store/features/responses'
import { useAppDispatch, useAppSelector  } from '../../../../store/hooks'
import { ResponsesState } from '../../../../store/features/responses'

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
  question: Question
}

export default function Question(
  { question }: QuestionProps
) {
  const router = useRouter()

  const { questionId, text, responses, nextQuestions } = question
  const initialResponse = { response: responses[0].id || '' }

  const currentQuestion = useAppSelector((state: any) => state.persistedReducer.currentQuestion)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (!currentQuestion) {
      dispatch(setCurrentQuestion('context'))
      return
    }
    router.push(currentQuestion)
  }, [])


  function handleQuestionSubmit (e: any) {
    const responseId = e.target.value

    console.log('Current question:', currentQuestion)

    dispatch(pushResponse({
      id: responseId,
      questionId: questionId
    }))
  }

  return (
    <div className="questionLayout" id={ `question_${questionId}` }>
      <h2>{ text }</h2>
      <Formik
        initialValues={initialResponse}
        onSubmit={(values, actions) => {
          console.log({values, actions})
        }}
      >
        <Form onChange={handleQuestionSubmit}>
          <QuestionInput question={question}/>
        </Form>
      </Formik>
    </div>
  )
}
