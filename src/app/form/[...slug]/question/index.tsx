'use client'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Question } from '../../../../types/question'
import QuestionInput from './question-input'
import { Form, Formik } from 'formik'

import { ResponsesState, goToNextQuestion, saveQuestions } from '../../../../store/features/responses'
import { useAppDispatch, useAppSelector  } from '../../../../store/hooks'
import computeNextQuestion, { getQuestionFromId } from '../../../../utils/logic/compute_next_question'

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
  question: Question,
  loadedQuestions: Question []
}

export default function Question(
  { question, loadedQuestions }: QuestionProps
) {
  const router = useRouter()

  const { questionId, text, responses, nextQuestions } = question
  const initialResponse = { response: responses[0].id || '' }

  const currentQuestion = useAppSelector((state: any) => state.persistedReducer.currentQuestion)
  const questions = useAppSelector((state: any) => state.persistedReducer.questions)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (questions.length === 0) {
      dispatch(saveQuestions(loadedQuestions))
    }
  }, [dispatch])


  useEffect(() => {
    router.push(currentQuestion)
  }, [currentQuestion])


  function handleQuestionSubmit (e: any) {
    const responseId = e.target.value

    // TODO: Use a Formik hook to mount the data of the input in an array of responses.

    dispatch(goToNextQuestion([responseId]))
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
