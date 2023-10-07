'use client'


import { useFormikContext } from 'formik'
import { Response } from '../../../../../types/question'


export default function Single (props: any) {
  const { setFieldValue, submitForm } = useFormikContext()
  const responses: Response [] = props.responses as Response []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFieldValue('response', {
      ids: [e.target.value],
      questionId: props.questionId
    })
    submitForm()
    e.stopPropagation()
  }

  return (
    <>
      {responses.map((response: Response, idx: number) => (
        <label
          key={idx}
          className='select-item'
        >
          <input
            type="radio"
            id={response.id}
            name="response"
            value={response.id}
            onChange={handleChange}
            className='input-default select-item'
          />
          { response.text }
        </label>
      ))}
    </>
  )
}