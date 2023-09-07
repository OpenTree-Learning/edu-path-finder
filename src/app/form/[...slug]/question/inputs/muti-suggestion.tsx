'use client'


import { Field, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { Response } from '../../../../../types/question'


interface MultiSuggestionInputProps {
  responses: Response [],
  questionId: string
}


//
// TODO: Upgrade this component: there is now way to delete an item.
//

function MultiSuggestionInput (props: MultiSuggestionInputProps) {

  const { setFieldValue, submitForm } = useFormikContext()

  const [inputValue, setInputValue] = useState('')
  const [responses, setResponses] = useState<Response[]>(props.responses)
  const [selectedResponses, setSelectedResponses] = useState<Response[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setInputValue(value)
  }

  const handleResponseClick = (response: Response) => {
    const isResponseSelected = selectedResponses.some(
      (selectedResponse) => selectedResponse.id === response.id
    )

    if (isResponseSelected) {
      setSelectedResponses((prevSelectedResponses) =>
        prevSelectedResponses.filter(
          (selectedResponse) => selectedResponse.id !== response.id
        )
      )
    } else {
      setSelectedResponses((prevSelectedResponses) => [
        ...prevSelectedResponses,
        response,
      ])
    }

    setInputValue('')
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputValue('')
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFieldValue('response', {
      ids: selectedResponses.map((r: Response) => r.id),
      questionId: props.questionId
    })
    submitForm()
    e.stopPropagation()
  }

  const filteredResponses = responses.filter(
    (response) =>
      response.text.toLowerCase().startsWith(inputValue.toLowerCase()) &&
      !selectedResponses.some((selectedResponse) => selectedResponse.id === response.id)
  )

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <ul>
        {filteredResponses.map((response) => (
          <li
            key={response.id}
            onClick={() => handleResponseClick(response)}
            style={{
              textDecoration: selectedResponses.some(
                (selectedResponse) => selectedResponse.id === response.id
              )
                ? 'line-through'
                : 'none',
            }}
          >
            {response.text}
          </li>
        ))}
      </ul>
      {selectedResponses.length > 0 && (
        <>
          <p>
            Selected Responses:{' '}
            {selectedResponses.map((selectedResponse) => selectedResponse.text).join(', ')}
          </p>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  )
}

export default function MultiSuggestion (props: any) {
  const responses: Response [] = props.responses as Response []

  return <MultiSuggestionInput
            responses={responses}
            questionId={props.questionId}
          />
}