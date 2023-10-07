'use client'


import { useFormikContext } from 'formik'
import React, { createRef, useState } from 'react'
import { Response, SubmitedResponse } from '../../../../../../types/question'

//@ts-ignore
import styles from './styles.module.scss'


interface MultiSuggestionInputProps {
  defaultSuggestions: Response [],
  onChange: (response: Response []) => void
}


//
// TODO: Upgrade this component: there is now way to delete an item.
//

function MultiSuggestionInput({
  defaultSuggestions,
  onChange
}: MultiSuggestionInputProps)
{
  const inputRef = createRef<HTMLInputElement>()

  const [tags, setTags] = useState<Response []>([])
  const [input, setInput] = useState<Response>({id: '', text: ''})
  const [suggestions, setSuggestions] = useState<Response []>(sortSuggestions(defaultSuggestions))
  const [allSuggestions, setAllSugestions] = useState<Response []>(sortSuggestions(defaultSuggestions))

  function sortSuggestions (suggestions: Response []): Response [] {
    return suggestions.sort((a: Response, b: Response) => {
      if(a.text < b.text) return -1
      if(a.text > b.text) return 1
      return 0
    })
  }

  function getSortedSuggestions (idx: number): Response [] {
    const updatedSuggestions = [...allSuggestions, tags[idx]]

    return sortSuggestions(updatedSuggestions)
  }

  function pushTag(tag: Response) {
    const updatedSuggestions = allSuggestions.filter((response: Response) => 
      response.text.toLowerCase() !== tag.text.toLowerCase()
    )

    setTags([...tags, tag])
    setInput({id: '', text: ''})
    setSuggestions(updatedSuggestions)
    setAllSugestions(updatedSuggestions)
  }

  function handleKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
    const matchingSuggestionIdx = suggestions.findIndex((response: Response) => response.text === input.text)
    const { key } = e

    /**
     * Handle enter key press: create new tag.
     */
    if (key === 'Enter' && input.text.length > 0) {
      if (!suggestions.find((tag: Response) => tag.text.toLowerCase() === input.text.toLowerCase())) {
        return
      }

      pushTag(input)
      e.preventDefault()
      e.stopPropagation()
    }

    /**
     * Handle backspace: remove last tag.
     */
    if (key === 'Backspace' && input.text === '' && tags.length > 0) {
      const lastTagIdx = tags.length - 1
      const sortedSuggestions = getSortedSuggestions(lastTagIdx)

      setSuggestions(sortedSuggestions)
      setAllSugestions(sortedSuggestions)
      setTags(tags.filter((_, idx) => idx < lastTagIdx))
    }

    /**
     * If there is no suggestions ignore directional keys to navigate
     * through the suggestions.
     */
    if (suggestions.length <= 0) {
      return
    }

    /**
     * Handle arrow up: select last suggestion.
     */
    if (key === 'ArrowUp') {
      const nextSuggestionIdx = (matchingSuggestionIdx <= 0) 
        ? (suggestions.length - 1) 
        : (matchingSuggestionIdx - 1)

      setInput(suggestions[nextSuggestionIdx])
    }

    /**
     * Handle arrow down: select next suggestion.
     */
    if (key === 'ArrowDown') {
      const prevSuggestionIdx = (matchingSuggestionIdx >= suggestions.length - 1) 
        ? 0
        : (matchingSuggestionIdx + 1)

      setInput(suggestions[prevSuggestionIdx])
    }
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    const matchingSuggestion = suggestions.find((response: Response) => 
      response.text.toLowerCase() === value.toLowerCase()
    )

    if (matchingSuggestion) {
      setInput(matchingSuggestion)
    } else {
      setInput({id: '', text: value})
    }

    if (value.length > 0) { 

      const updatedSuggestions = allSuggestions.filter(suggestion => {
        const { text } = suggestion

        return text.substring(0, value.length).toLowerCase() === value.toLowerCase()
            && !tags.find((tag: Response) => tag.text === text)
      })

      setSuggestions(updatedSuggestions)

    } else {
      setSuggestions(allSuggestions)
    }

    e.stopPropagation()
  }

  function handleTagClose (e: React.MouseEvent<HTMLSpanElement>, tagIdx: number) {
    const sortedSuggestions = sortSuggestions([...allSuggestions, tags[tagIdx]])

    e.stopPropagation()
    setTags(tags.filter((_, idx) => idx != tagIdx))
    setSuggestions(sortedSuggestions)
    setAllSugestions(sortedSuggestions)
  }

  function handleSuggestionHover (e: React.MouseEvent<HTMLDivElement>, suggestionIdx: number) {
    e.stopPropagation()
    setInput(suggestions[suggestionIdx])
  }

  function handleSuggestionClick (e: React.MouseEvent<HTMLDivElement>, suggestionIdx: number) {
    e.stopPropagation()
    pushTag(suggestions[suggestionIdx])
    inputRef.current?.focus()
  }

  function handleSubmit (e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    e.stopPropagation()
    onChange(tags)
  }


  return (
    <>
      <label className={styles.inputContainer} htmlFor='input'>
        <div className={`${styles.input} input-default`}>
          {tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>
              {tag.text}
              <span
                className={styles.closeTag}
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleTagClose(e, idx)}
              >
                x
              </span>
            </span>
          ))}
          <input
            id='input'
            type='text'
            value={input.text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            autoFocus
            className='input-default'
          />
        </div>
        <div className={styles.suggestions}>
          {suggestions.map((suggestion, idx) => (
            <>
              {(suggestion.text === input.text) ? (
                <div 
                  className={`${styles.currentSuggestion} select-item`}
                  key={idx}
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => handleSuggestionClick(e, idx)}
                >
                  { suggestion.text }
                </div>
              ): (
                <div
                  className={`${styles.suggestion} select-item`}
                  key={idx}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => handleSuggestionHover(e, idx)}
                >
                  { suggestion.text }
                </div>
              )} 
            </>
          ))}
        </div>
      </label>
      <button
        onClick={handleSubmit}
        className='btn-default'
      >
        Valider
      </button>
    </>
  )
}

export default function MultiSuggestion (props: any) {

  const { setFieldValue, submitForm } = useFormikContext()
  const questionId: string = props.questionId as string
  const responses: Response [] = props.responses as Response []

  function handleChange (responses: Response []) {
    const submittedResponse: SubmitedResponse = {
      'ids': responses.map((response: Response) => response.id),
      'questionId': questionId
    }

    setFieldValue('response', submittedResponse)
    submitForm()
  }

  return <MultiSuggestionInput
            defaultSuggestions={responses}
            onChange={handleChange}
          />
}