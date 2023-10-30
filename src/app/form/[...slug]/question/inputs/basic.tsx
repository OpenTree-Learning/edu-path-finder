'use client'


import { Field } from 'formik'
import { useFormikContext } from 'formik'
import { copyAndDelete } from '../../../../../utils/helpers/object'
import { use, useEffect, useState } from 'react'
import { DEFAULT_NEXT_QUESTION } from 'store/features/responses'


function BasicInput (props: any) {
  const { setFieldValue, submitForm } = useFormikContext()
  const [inputProps, setInputProps] = useState<any>({})
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    let propsCopy = Object.assign({}, props)

    delete propsCopy.questionId
    delete propsCopy.responses

    setInputProps(propsCopy)
  }, [props])

  const submit = (value: string) => {

    if (!props.questionId) {
      return
    }

    setFieldValue('response', {
      ids: [value],
      questionId: props.questionId
    })
    submitForm()
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    submit(input)
    e.stopPropagation()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    e.stopPropagation()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      submit(input)
      e.stopPropagation()
    }
  }

  // TODO: Props contains 'questionId' which is not 
  //       an input element attribute.

  return (
    <>
      <input 
        type={props.type}
        id='response'
        name='response' 
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='input-default'
        {...inputProps}
      />
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

export const Text = (props: any) => <BasicInput {...props} type='text' />
export const Number = (props: any) => <BasicInput {...props} type='number' />
export const Email = (props: any) => <BasicInput {...props} type='email' />