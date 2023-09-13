'use client'


import { Field } from 'formik'
import { useFormikContext } from 'formik'
import { copyAndDelete } from '../../../../../utils/helpers/object'
import { useState } from 'react'


function BasicInput (props: any) {
  const { setFieldValue, submitForm } = useFormikContext()
  const [input, setInput] = useState<string>('')

  const submit = (value: string) => {
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

  return (
    <div>
      <input 
        type={props.type}
        id='response'
        name='response' 
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export const Text = (props: any) => <BasicInput {...props} type='text' />
export const Number = (props: any) => <BasicInput {...props} type='number' />
export const Email = (props: any) => <BasicInput {...props} type='email' />