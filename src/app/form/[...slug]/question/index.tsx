'use client'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { isStringInputType, isNumericalInputType, isArrayInputType, SubmitedResponse } from '../../../../types/question'
import { Question as QuestionType } from '../../../../types/question'
import QuestionInput from './question-input'
import { Form, Formik } from 'formik'

import { ResponsesState, goToNextQuestion, saveQuestions, reset } from '../../../../store/features/responses'
import { useAppDispatch, useAppSelector  } from '../../../../store/hooks'
import computeNextQuestion, { getQuestionFromId } from '../../../../utils/logic/compute_next_question'
import { displayPartsToString } from 'typescript'

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
      <div style={{textAlign: 'center'}}>
        <h2>End of the form!</h2>
        <h3>Thanks for answering all the question!</h3>
        <h3>We're working on building your best learning path!</h3>
        <button onClick={handleRestart}>Restart form</button>
      </div>
    )
  }

  const { questionId, text, inputType, inputProps, responses, nextQuestions } = question
  const initialValueMap = [
    [isStringInputType(inputType), inputProps?.defaultValue || responses[0]?.id || ''],
    [isNumericalInputType(inputType), inputProps?.defaultValue || inputProps?.min || 0],
    [isArrayInputType(inputType), inputProps?.defaultValues || [responses[0]?.id] || []]
  ]
  const initialValue = initialValueMap.find((value: any []) => value[0]) as any []
  const initialValues = { response: initialValue[1] }

  const currentQuestion = useAppSelector((state: any) => state.persistedReducer.currentQuestion)
  const questions = useAppSelector((state: any) => state.persistedReducer.questions)


  useEffect(() => {
    if (questions.length === 0) {
      dispatch(saveQuestions(loadedQuestions))
    }
  }, [dispatch])


  useEffect(() => {
    router.push(currentQuestion)
  }, [currentQuestion])


  function handleQuestionSubmit (response: SubmitedResponse) {
    console.log('SUBMIT IS TRIGERED!!', {response})

    // TODO: Receive currentQuestion from the input event.
    dispatch(goToNextQuestion(response))
  }

  return (
    <div className="questionLayout" id={ `question_${questionId}` }>
      <h2>{ text }</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleQuestionSubmit(values.response)}
      >
        <Form>
          <QuestionInput question={question}/>
        </Form>
      </Formik>
    </div>
  )
}
