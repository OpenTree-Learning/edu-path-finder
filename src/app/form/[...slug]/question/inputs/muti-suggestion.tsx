'use client'


import { Field } from 'formik'
import React, { useState } from 'react'
import { Response } from '../../../../../types/question'


interface MultiSuggestionInputProps {
  responses: Response []
}

function MultiSuggestionInput (props: MultiSuggestionInputProps) {

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
        <p>
          Selected Responses:{' '}
          {selectedResponses.map((selectedResponse) => selectedResponse.text).join(', ')}
        </p>
      )}
    </div>
  )
}

export default function MultiSuggestion (props: any) {
  const responses: Response [] = props.responses as Response []

  return <Field
    type="multi-suggestion"
    id="response"
    name="response"
    inputProps={{responses: responses}}
    component={MultiSuggestionInput}
  />
}