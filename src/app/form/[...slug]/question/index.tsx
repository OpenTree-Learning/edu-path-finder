'use client'


import { Question } from "../../../../types/question"
import QuestionInput from "./question-input"
import { Form, Formik, FormikProps } from 'formik'


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

  return (
    <div className="questionLayout" id={ `question_${questionId}` }>
      <h2>{ text }</h2>
      <Formik
        initialValues={initialResponse}
        handleChange={(e: any) => console.log(e)}
        onSubmit={(values, actions) => {
          console.log({values, actions})
        }}
      >
        <Form>
          <QuestionInput question={question}/>
        </Form>
      </Formik>
    </div>
  )
}
