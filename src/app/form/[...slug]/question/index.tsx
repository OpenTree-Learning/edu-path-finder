'use client'


import { Question } from '../../../../types/question'
import QuestionInput from './question-input'
import { Form, Formik } from 'formik'

import { pushResponse } from '../../../../store/features/responses'
import { useAppDispatch  } from '../../../../store/hooks'

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
  const { questionId, text, responses, nextQuestions } = question
  const initialResponse = { response: responses[0].id || '' }

  const dispatch = useAppDispatch()


  function handleQuestionSubmit (e: any) {
    const responseId = e.target.value

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
