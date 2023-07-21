'use client'


import { Field } from 'formik'
import React, { useState } from 'react'
import { Response } from '../../../../../types/question'


interface SingleSuggestionInputProps {
  responses: Response []
}

function SingleSuggestionInput (props: SingleSuggestionInputProps) {

  const [inputValue, setInputValue] = useState('')
  const [responses, setResponses] = useState<Response[]>(props.responses)
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleResponseClick = (Response: Response) => {
    setSelectedResponse(Response)
    setInputValue(Response.text)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const matchingResponse = responses.find((Response) =>
        Response.text.toLowerCase() === inputValue.toLowerCase()
      )

      if (matchingResponse) {
        setSelectedResponse(matchingResponse)
        setInputValue(matchingResponse.text)
      }
    }
  }

  const filteredResponses = responses.filter((Response) =>
    Response.text.toLowerCase().startsWith(inputValue.toLowerCase())
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

  return <Field
    type="single-suggestion"
    id="response"
    name="response"
    inputProps={{responses: responses}}
    component={SingleSuggestionInput}
  />
}