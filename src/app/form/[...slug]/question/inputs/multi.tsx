'use client'


import { Field, useFormikContext } from 'formik'
import { Response } from '../../../../../types/question'
import { useEffect, useState } from 'react'


export default function Multi (props: any) {
  const responses: Response [] = props.responses as Response []
  const { setFieldValue, submitForm } = useFormikContext()

  const [selectedResponses, setSelectedResponses] = useState<string []>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const responseId = e.target.value as string

    if (selectedResponses.includes(responseId)) {
      setSelectedResponses(selectedResponses.filter((response: string) => response !== responseId))
      return
    }
    setSelectedResponses([...selectedResponses, responseId])
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    setFieldValue('response', {
      ids: selectedResponses,
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
            type="checkbox"
            id={response.id}
            name="response"
            value={response.id}
            onChange={handleChange}
            className='input-default'
          />
          { response.text }
        </label>
      ))}
      <button
        onClick={handleSubmit}
        className='btn-default'
        type='submit'
      >
        Submit
      </button>
    </>
  )
}