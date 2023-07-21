'use client'


import { Field } from 'formik'
import { Response } from '../../../../../types/question'


export default function Multi (props: any) {
  const responses: Response [] = props.responses as Response []

  return responses.map((response: Response, idx: number) => (
    <div role="group" aria-labelledby="checkbox-group">
      <label key={idx}>
        <Field
          type="checkbox"
          id={response.id}
          name={response.id}
          value={response.id}
        />
        { response.text }
      </label>
    </div>
  ))
}