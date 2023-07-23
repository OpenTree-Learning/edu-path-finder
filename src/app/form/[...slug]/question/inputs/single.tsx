'use client'


import { Field } from 'formik'
import { Response } from '../../../../../types/question'


export default function Single (props: any) {
  const responses: Response [] = props.responses as Response []

  return (
    <div role="group" aria-labelledby="radio-group">
      {responses.map((response: Response, idx: number) => (
        <label key={idx}>
          <Field
            type="radio"
            id={response.id}
            name="response"
            value={response.id}
          />
          { response.text }
        </label>
      ))}
    </div>
  )
}