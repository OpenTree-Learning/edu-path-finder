'use client'


import { Field, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { Response } from '../../../../../types/question'


interface SingleSuggestionInputProps {
  responses: Response [],
  questionId: string
}

function SingleSuggestionInput (props: SingleSuggestionInputProps) {

  const { setFieldValue, submitForm } = useFormikContext()

  const [inputValue, setInputValue] = useState('')
  const [responses, setResponses] = useState<Response[]>(props.responses)
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleResponseClick = (response: Response) => {
    setSelectedResponse(response)
    setInputValue(response.text)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const matchingResponse = responses.find((response) =>
        response.text.toLowerCase() === inputValue.toLowerCase()
      )

      if (matchingResponse) {
        setSelectedResponse(matchingResponse)
        setInputValue(matchingResponse.text)
        setFieldValue('response', [matchingResponse.id])
        submitForm()
        event.stopPropagation()
      }
    }
  }

  const filteredResponses = responses.filter((response) =>
    response.text.toLowerCase().startsWith(inputValue.toLowerCase())
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
        {filteredResponses.map((response: Response) => (
          <li key={response.id} onClick={() => handleResponseClick(response)}>
            {response.text}
          </li>
        ))}
      </ul>
      {selectedResponse && (
        <p>Selected Response: {selectedResponse.text}</p>
      )}
    </div>
  )
}


export default function SingleSuggestion (props: any) {
  const responses: Response [] = props.responses as Response []

  return <SingleSuggestionInput
    responses={responses}
    questionId={props.questionId}
  />
}